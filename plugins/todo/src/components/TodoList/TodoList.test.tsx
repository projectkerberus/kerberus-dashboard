/*
 * Copyright 2021 Spotify AB
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

import { Entity } from '@backstage/catalog-model';
import { EntityProvider } from '@backstage/plugin-catalog-react';
import { renderWithEffects } from '@backstage/test-utils';
import React from 'react';
import { TodoApi, todoApiRef } from '../../api';
import { TodoList } from './TodoList';
import { ApiProvider, ApiRegistry } from '@backstage/core-app-api';

describe('TodoList', () => {
  it('should render', async () => {
    const mockApi: jest.Mocked<TodoApi> = {
      listTodos: jest.fn().mockResolvedValue({
        items: [
          {
            text: 'My TODO',
            tag: 'FIXME',
            viewUrl: 'https://example.com',
            repoFilePath: '/my-file.js',
          },
        ],
        totalCount: 1,
        limit: 10,
        offset: 0,
      }),
    };
    const mockEntity = { metadata: { name: 'mock' } } as Entity;

    const rendered = await renderWithEffects(
      <ApiProvider apis={ApiRegistry.with(todoApiRef, mockApi)}>
        <EntityProvider entity={mockEntity}>
          <TodoList />
        </EntityProvider>
      </ApiProvider>,
    );

    await expect(rendered.findByText('FIXME')).resolves.toBeInTheDocument();
  });
});
