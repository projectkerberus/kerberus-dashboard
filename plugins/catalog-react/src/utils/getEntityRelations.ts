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

import { Entity, EntityName } from '@backstage/catalog-model';

/**
 * Get the related entity references.
 */
export function getEntityRelations(
  entity: Entity | undefined,
  relationType: string,
  filter?: { kind: string },
): EntityName[] {
  let entityNames =
    entity?.relations
      ?.filter(r => r.type === relationType)
      ?.map(r => r.target) || [];

  if (filter?.kind) {
    entityNames = entityNames?.filter(
      e => e.kind.toLowerCase() === filter.kind.toLowerCase(),
    );
  }

  return entityNames;
}
