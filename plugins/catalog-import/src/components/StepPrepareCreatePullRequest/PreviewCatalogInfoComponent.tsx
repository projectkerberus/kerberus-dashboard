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
import { CodeSnippet } from '@backstage/core';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import YAML from 'yaml';

type Props = {
  repositoryUrl: string;
  entities: Entity[];
  classes?: { card?: string; cardContent?: string };
};

export const PreviewCatalogInfoComponent = ({
  repositoryUrl,
  entities,
  classes,
}: Props) => {
  return (
    <Card variant="outlined" className={classes?.card}>
      <CardHeader
        title={
          <code>{`${repositoryUrl.replace(
            /[\/]*$/,
            '',
          )}/catalog-info.yaml`}</code>
        }
      />

      <CardContent className={classes?.cardContent}>
        <CodeSnippet
          text={entities
            .map(e => YAML.stringify(e))
            .join('---\n')
            .trim()}
          language="yaml"
        />
      </CardContent>
    </Card>
  );
};
