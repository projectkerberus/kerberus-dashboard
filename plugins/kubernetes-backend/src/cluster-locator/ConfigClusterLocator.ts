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

import { Config } from '@backstage/config';
import { ClusterDetails, KubernetesClustersSupplier } from '../types/types';

export class ConfigClusterLocator implements KubernetesClustersSupplier {
  private readonly clusterDetails: ClusterDetails[];

  constructor(clusterDetails: ClusterDetails[]) {
    this.clusterDetails = clusterDetails;
  }

  static fromConfig(config: Config): ConfigClusterLocator {
    // TODO: Add validation that authProvider is required and serviceAccountToken
    // is required if authProvider is serviceAccount
    return new ConfigClusterLocator(
      config.getConfigArray('clusters').map(c => {
        return {
          name: c.getString('name'),
          url: c.getString('url'),
          serviceAccountToken: c.getOptionalString('serviceAccountToken'),
          skipTLSVerify: c.getOptionalBoolean('skipTLSVerify') ?? false,
          authProvider: c.getString('authProvider'),
        };
      }),
    );
  }

  async getClusters(): Promise<ClusterDetails[]> {
    return this.clusterDetails;
  }
}
