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
  configApiRef,
  createApiFactory,
  createComponentExtension,
  createPlugin,
  discoveryApiRef,
} from '@backstage/core';
import { sonarQubeApiRef, SonarQubeClient } from './api';

export const sonarQubePlugin = createPlugin({
  id: 'sonarqube',
  apis: [
    createApiFactory({
      api: sonarQubeApiRef,
      deps: { configApi: configApiRef, discoveryApi: discoveryApiRef },
      factory: ({ configApi, discoveryApi }) =>
        new SonarQubeClient({
          discoveryApi,
          baseUrl: configApi.getOptionalString('sonarQube.baseUrl'),
        }),
    }),
  ],
});

export const EntitySonarQubeCard = sonarQubePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/SonarQubeCard').then(m => m.SonarQubeCard),
    },
  }),
);
