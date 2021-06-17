/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  AlertDisplay,
  AnyApiFactory,
  ApiFactory,
  attachComponentData,
  configApiRef,
  createApiFactory,
  createApp,
  createPlugin,
  createRouteRef,
  FlatRoutes,
  IconComponent,
  OAuthRequestDialog,
  RouteRef,
  Sidebar,
  SidebarItem,
  SidebarPage,
  SidebarSpacer,
} from '@backstage/core';
import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
} from '@backstage/integration-react';
import { Box } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import React, { ComponentType, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router';

const GatheringRoute: (props: {
  path: string;
  element: JSX.Element;
  children?: ReactNode;
}) => JSX.Element = ({ element }) => element;

attachComponentData(GatheringRoute, 'core.gatherMountPoints', true);

type RegisterPageOptions = {
  path?: string;
  element: JSX.Element;
  children?: JSX.Element;
  title?: string;
  icon?: IconComponent;
};

// TODO(rugvip): export proper plugin type from core that isn't the plugin class
type BackstagePlugin = ReturnType<typeof createPlugin>;

/**
 * DevApp builder that is similar to the App builder API, but creates an App
 * with the purpose of developing one or more plugins inside it.
 */
class DevAppBuilder {
  private readonly plugins = new Array<BackstagePlugin>();
  private readonly apis = new Array<AnyApiFactory>();
  private readonly rootChildren = new Array<ReactNode>();
  private readonly routes = new Array<JSX.Element>();
  private readonly sidebarItems = new Array<JSX.Element>();

  /**
   * Register one or more plugins to render in the dev app
   */
  registerPlugin(...plugins: BackstagePlugin[]): DevAppBuilder {
    this.plugins.push(...plugins);
    return this;
  }

  /**
   * Register an API factory to add to the app
   */
  registerApi<
    Api,
    Impl extends Api,
    Deps extends { [name in string]: unknown }
  >(factory: ApiFactory<Api, Impl, Deps>): DevAppBuilder {
    this.apis.push(factory);
    return this;
  }

  /**
   * Adds a React node to place just inside the App Provider.
   *
   * Useful for adding more global components like the AlertDisplay.
   */
  addRootChild(node: ReactNode): DevAppBuilder {
    this.rootChildren.push(node);
    return this;
  }

  /**
   * Adds a page component along with accompanying sidebar item.
   *
   * If no path is provided one will be generated.
   * If no title is provided, no sidebar item will be created.
   */
  addPage(opts: RegisterPageOptions): DevAppBuilder {
    const path = opts.path ?? `/page-${this.routes.length + 1}`;
    if (opts.title) {
      this.sidebarItems.push(
        <SidebarItem
          key={path}
          to={path}
          text={opts.title}
          icon={opts.icon ?? BookmarkIcon}
        />,
      );
    }
    this.routes.push(
      <GatheringRoute
        key={path}
        path={path}
        element={opts.element}
        children={opts.children}
      />,
    );
    return this;
  }

  /**
   * Build a DevApp component using the resources registered so far
   */
  build(): ComponentType<{}> {
    const dummyRouteRef = createRouteRef({ title: 'Page of another plugin' });
    const DummyPage = () => <Box p={3}>Page belonging to another plugin.</Box>;
    attachComponentData(DummyPage, 'core.mountPoint', dummyRouteRef);

    const apis = [...this.apis];
    if (!apis.some(api => api.api.id === scmIntegrationsApiRef.id)) {
      apis.push(
        createApiFactory({
          api: scmIntegrationsApiRef,
          deps: { configApi: configApiRef },
          factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
        }),
      );
    }

    const app = createApp({
      apis,
      plugins: this.plugins,
      bindRoutes: ({ bind }) => {
        for (const plugin of this.plugins ?? []) {
          const targets: Record<string, RouteRef<any>> = {};
          for (const routeKey of Object.keys(plugin.externalRoutes)) {
            targets[routeKey] = dummyRouteRef;
          }
          bind(plugin.externalRoutes, targets);
        }
      },
    });

    const AppProvider = app.getProvider();
    const AppRouter = app.getRouter();
    const deprecatedAppRoutes = app.getRoutes();

    const sidebar = this.setupSidebar(this.plugins);

    const DevApp = () => {
      return (
        <AppProvider>
          <AlertDisplay />
          <OAuthRequestDialog />
          {this.rootChildren}
          <AppRouter>
            <SidebarPage>
              {sidebar}
              <FlatRoutes>
                {this.routes}
                {deprecatedAppRoutes}
                <Route path="/_external_route" element={<DummyPage />} />
              </FlatRoutes>
            </SidebarPage>
          </AppRouter>
        </AppProvider>
      );
    };

    return DevApp;
  }

  /**
   * Build and render directory to #root element, with react hot loading.
   */
  render(): void {
    const hotModule =
      require.cache['./dev/index.tsx'] ??
      require.cache['./dev/index.ts'] ??
      module;

    const DevApp = hot(hotModule)(this.build());

    const paths = this.findPluginPaths(this.plugins);

    if (window.location.pathname === '/') {
      if (!paths.includes('/') && paths.length > 0) {
        window.location.pathname = paths[0];
      }
    }

    ReactDOM.render(<DevApp />, document.getElementById('root'));
  }

  // Create a sidebar that exposes the touchpoints of a plugin
  private setupSidebar(plugins: BackstagePlugin[]): JSX.Element {
    const sidebarItems = new Array<JSX.Element>();
    for (const plugin of plugins) {
      for (const output of plugin.output()) {
        switch (output.type) {
          case 'legacy-route': {
            const { path } = output;
            sidebarItems.push(
              <SidebarItem
                key={path}
                to={path}
                text={path}
                icon={BookmarkIcon}
              />,
            );
            break;
          }
          case 'route': {
            const { target } = output;
            sidebarItems.push(
              <SidebarItem
                key={target.path}
                to={target.path}
                text={target.title}
                icon={target.icon ?? SentimentDissatisfiedIcon}
              />,
            );
            break;
          }
          default:
            break;
        }
      }
    }

    return (
      <Sidebar>
        <SidebarSpacer />
        {this.sidebarItems}
        {sidebarItems}
      </Sidebar>
    );
  }

  private findPluginPaths(plugins: BackstagePlugin[]) {
    const paths = new Array<string>();

    for (const plugin of plugins) {
      for (const output of plugin.output()) {
        switch (output.type) {
          case 'legacy-route': {
            paths.push(output.path);
            break;
          }
          case 'route': {
            paths.push(output.target.path);
            break;
          }
          default:
            break;
        }
      }
    }

    return paths;
  }
}

// TODO(rugvip): Figure out patterns for how to allow in-house apps to build upon
// this to provide their own plugin dev wrappers.

/**
 * Creates a dev app for rendering one or more plugins and exposing the touch points of the plugin.
 */
export function createDevApp() {
  return new DevAppBuilder();
}
