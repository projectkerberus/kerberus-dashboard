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
import { Logger } from 'winston';

export type PreparerOptions = {
  /**
   * Full URL to the directory containg template data
   */
  url: string;
  /**
   * The workspace path that will eventually be the the root of the new repo
   */
  workspacePath: string;
  logger: Logger;
};

export interface PreparerBase {
  /**
   * Prepare a directory with contents from the remote location
   */
  prepare(opts: PreparerOptions): Promise<void>;
}

export type PreparerBuilder = {
  register(host: string, preparer: PreparerBase): void;
  get(url: string): PreparerBase;
};
