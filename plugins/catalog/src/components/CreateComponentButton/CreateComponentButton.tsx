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

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useRouteRef } from '@backstage/core';
import { createComponentRouteRef } from '../../routes';

export const CreateComponentButton = () => {
  const createComponentLink = useRouteRef(createComponentRouteRef);

  if (!createComponentLink) return null;

  return (
    <Button
      component={RouterLink}
      variant="contained"
      color="primary"
      to={createComponentLink()}
    >
      Create Component
    </Button>
  );
};
