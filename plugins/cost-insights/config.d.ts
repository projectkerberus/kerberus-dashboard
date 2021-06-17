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

interface Config {
  costInsights: {
    /**
     * @visibility frontend
     */
    engineerCost: number;

    products: {
      [kind: string]: {
        /**
         * @visibility frontend
         */
        name: string;

        /**
         * @visibility frontend
         */
        icon?: 'compute' | 'data' | 'database' | 'storage' | 'search' | 'ml';
      };
    };

    metrics?: {
      [kind: string]: {
        /**
         * @visibility frontend
         */
        name: string;

        /**
         * @visibility frontend
         */
        default?: boolean;
      };
    };
  };
}
