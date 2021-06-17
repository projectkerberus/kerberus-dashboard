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

import { getVoidLogger, resolvePackagePath } from '@backstage/backend-common';
import knexFactory, { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'winston';
import { CommonDatabase } from './CommonDatabase';
import { Database } from './types';

const migrationsDir = resolvePackagePath(
  '@backstage/plugin-catalog-backend',
  'migrations',
);

export type CreateDatabaseOptions = {
  logger: Logger;
};

const defaultOptions: CreateDatabaseOptions = {
  logger: getVoidLogger(),
};

export class DatabaseManager {
  public static async createDatabase(
    knex: Knex,
    options: Partial<CreateDatabaseOptions> = {},
  ): Promise<Database> {
    await knex.migrate.latest({
      directory: migrationsDir,
    });
    const { logger } = { ...defaultOptions, ...options };
    return new CommonDatabase(knex, logger);
  }

  public static async createInMemoryDatabase(): Promise<Database> {
    const knex = await this.createInMemoryDatabaseConnection();
    return await this.createDatabase(knex);
  }

  public static async createInMemoryDatabaseConnection(): Promise<Knex> {
    const knex = knexFactory({
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true,
    });

    knex.client.pool.on('createSuccess', (_eventId: any, resource: any) => {
      resource.run('PRAGMA foreign_keys = ON', () => {});
    });

    return knex;
  }

  public static async createTestDatabase(): Promise<Database> {
    const knex = await this.createTestDatabaseConnection();
    return await this.createDatabase(knex);
  }

  public static async createTestDatabaseConnection(): Promise<Knex> {
    const config: Knex.Config<any> = {
      /*
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
      },
      */
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true,
    };

    let knex = knexFactory(config);
    if (typeof config.connection !== 'string') {
      const tempDbName = `d${uuidv4().replace(/-/g, '')}`;
      await knex.raw(`CREATE DATABASE ${tempDbName};`);
      knex = knexFactory({
        ...config,
        connection: {
          ...config.connection,
          database: tempDbName,
        },
      });
    }

    knex.client.pool.on('createSuccess', (_eventId: any, resource: any) => {
      resource.run('PRAGMA foreign_keys = ON', () => {});
    });

    return knex;
  }
}
