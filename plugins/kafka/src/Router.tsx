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

import { Entity } from '@backstage/catalog-model';
import React from 'react';
import { Route, Routes } from 'react-router';
import { useEntity } from '@backstage/plugin-catalog-react';
import { rootCatalogKafkaRouteRef } from './plugin';
import { KAFKA_CONSUMER_GROUP_ANNOTATION } from './constants';
import { KafkaTopicsForConsumer } from './components/ConsumerGroupOffsets/ConsumerGroupOffsets';
import { MissingAnnotationEmptyState } from '@backstage/core';

export const isPluginApplicableToEntity = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[KAFKA_CONSUMER_GROUP_ANNOTATION]);

type Props = {
  /** @deprecated The entity is now grabbed from context instead */
  entity?: Entity;
};

export const Router = (_props: Props) => {
  const { entity } = useEntity();

  if (!isPluginApplicableToEntity(entity)) {
    return (
      <MissingAnnotationEmptyState
        annotation={KAFKA_CONSUMER_GROUP_ANNOTATION}
      />
    );
  }

  return (
    <Routes>
      <Route
        path={`${rootCatalogKafkaRouteRef.path}`}
        element={<KafkaTopicsForConsumer />}
      />
    </Routes>
  );
};
