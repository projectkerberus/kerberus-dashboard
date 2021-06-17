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

import React, { ComponentType, ReactNode, ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { lightTheme } from '@backstage/theme';
import privateExports, {
  defaultSystemIcons,
  BootErrorPageProps,
  RouteRef,
  ExternalRouteRef,
  attachComponentData,
  createRouteRef,
} from '@backstage/core-api';
import { RenderResult } from '@testing-library/react';
import { renderWithEffects } from '@backstage/test-utils-core';
import { mockApis } from './mockApis';

const { PrivateAppImpl } = privateExports;

const NotFoundErrorPage = () => {
  throw new Error('Reached NotFound Page');
};
const BootErrorPage = ({ step, error }: BootErrorPageProps) => {
  throw new Error(`Reached BootError Page at step ${step} with error ${error}`);
};
const Progress = () => <div data-testid="progress" />;

/**
 * Options to customize the behavior of the test app wrapper.
 */
type TestAppOptions = {
  /**
   * Initial route entries to pass along as `initialEntries` to the router.
   */
  routeEntries?: string[];

  /**
   * An object of paths to mount route ref on, with the key being the path and the value
   * being the RouteRef that the path will be bound to. This allows the route refs to be
   * used by `useRouteRef` in the rendered elements.
   *
   * @example
   * wrapInTestApp(<MyComponent />, {
   *   mountedRoutes: {
   *     '/my-path': myRouteRef,
   *   }
   * })
   * // ...
   * const link = useRouteRef(myRouteRef)
   */
  mountedRoutes?: { [path: string]: RouteRef | ExternalRouteRef };
};

function isExternalRouteRef(
  routeRef: RouteRef | ExternalRouteRef,
): routeRef is ExternalRouteRef {
  // TODO(Rugvip): Least ugly workaround for now, but replace :D
  return String(routeRef).includes('{type=external,');
}

/**
 * Wraps a component inside a Backstage test app, providing a mocked theme
 * and app context, along with mocked APIs.
 *
 * @param Component - A component or react node to render inside the test app.
 * @param options - Additional options for the rendering.
 */
export function wrapInTestApp(
  Component: ComponentType | ReactNode,
  options: TestAppOptions = {},
): ReactElement {
  const { routeEntries = ['/'] } = options;
  const boundRoutes = new Map<ExternalRouteRef, RouteRef>();

  const app = new PrivateAppImpl({
    apis: [],
    components: {
      NotFoundErrorPage,
      BootErrorPage,
      Progress,
      Router: ({ children }) => (
        <MemoryRouter initialEntries={routeEntries} children={children} />
      ),
    },
    icons: defaultSystemIcons,
    plugins: [],
    themes: [
      {
        id: 'light',
        theme: lightTheme,
        title: 'Test App Theme',
        variant: 'light',
      },
    ],
    defaultApis: mockApis,
    bindRoutes: ({ bind }) => {
      for (const [externalRef, absoluteRef] of boundRoutes) {
        bind(
          { ref: externalRef },
          {
            ref: absoluteRef,
          },
        );
      }
    },
  });

  let wrappedElement: React.ReactElement;
  if (Component instanceof Function) {
    wrappedElement = <Component />;
  } else {
    wrappedElement = Component as React.ReactElement;
  }

  const routeElements = Object.entries(options.mountedRoutes ?? {}).map(
    ([path, routeRef]) => {
      const Page = () => <div>Mounted at {path}</div>;

      // Allow external route refs to be bound to paths as well, for convenience.
      // We work around it by creating and binding an absolute ref to the external one.
      if (isExternalRouteRef(routeRef)) {
        const absoluteRef = createRouteRef({ id: 'id' });
        boundRoutes.set(routeRef, absoluteRef);
        attachComponentData(Page, 'core.mountPoint', absoluteRef);
      } else {
        attachComponentData(Page, 'core.mountPoint', routeRef);
      }
      return <Route key={path} path={path} element={<Page />} />;
    },
  );

  const AppProvider = app.getProvider();
  const AppRouter = app.getRouter();

  return (
    <AppProvider>
      <AppRouter>
        {routeElements}
        {/* The path of * here is needed to be set as a catch all, so it will render the wrapper element
         *  and work with nested routes if they exist too */}
        <Route path="*" element={wrappedElement} />
      </AppRouter>
    </AppProvider>
  );
}

/**
 * Renders a component inside a Backstage test app, providing a mocked theme
 * and app context, along with mocked APIs.
 *
 * The render executes async effects similar to `renderWithEffects`. To avoid this
 * behavior, use a regular `render()` + `wrapInTestApp()` instead.
 *
 * @param Component - A component or react node to render inside the test app.
 * @param options - Additional options for the rendering.
 */
export async function renderInTestApp(
  Component: ComponentType | ReactNode,
  options: TestAppOptions = {},
): Promise<RenderResult> {
  return renderWithEffects(wrapInTestApp(Component, options));
}
