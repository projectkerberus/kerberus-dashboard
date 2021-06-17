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

import React from 'react';
import { createPlugin } from '../plugin';
import { createRouteRef } from '../routing';
import { getComponentData } from './componentData';
import {
  createComponentExtension,
  createReactExtension,
  createRoutableExtension,
} from './extensions';

const plugin = createPlugin({
  id: 'my-plugin',
});

describe('extensions', () => {
  it('should create a react extension with component data', () => {
    const Component = () => <div />;

    const extension = createReactExtension({
      component: {
        sync: Component,
      },
      data: {
        myData: { foo: 'bar' },
      },
    });

    const ExtensionComponent = plugin.provide(extension);
    const element = <ExtensionComponent />;

    expect(getComponentData(element, 'core.plugin')).toBe(plugin);
    expect(getComponentData(element, 'myData')).toEqual({ foo: 'bar' });
  });

  it('should create react extensions of different types', () => {
    const Component = () => <div />;
    const routeRef = createRouteRef({ path: '/foo', title: 'Foo' });

    const extension1 = createComponentExtension({
      component: {
        sync: Component,
      },
    });

    const extension2 = createRoutableExtension({
      component: () => Promise.resolve(Component),
      mountPoint: routeRef,
    });

    const ExtensionComponent1 = plugin.provide(extension1);
    const ExtensionComponent2 = plugin.provide(extension2);

    const element1 = <ExtensionComponent1 />;
    const element2 = <ExtensionComponent2 />;

    expect(getComponentData(element1, 'core.plugin')).toBe(plugin);
    expect(getComponentData(element2, 'core.plugin')).toBe(plugin);
    expect(getComponentData(element2, 'core.mountPoint')).toBe(routeRef);
  });
});
