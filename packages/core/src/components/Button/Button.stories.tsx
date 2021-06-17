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
import React, { FunctionComponentFactory } from 'react';
import { Button } from './Button';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { createRouteRef } from '@backstage/core-api';
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button as MaterialButton,
} from '@material-ui/core';

const Location = () => {
  const location = useLocation();
  return <pre>Current location: {location.pathname}</pre>;
};

export default {
  title: 'Inputs/Button',
  component: Button,
  decorators: [
    (storyFn: FunctionComponentFactory<{}>) => (
      <>
        <Typography>
          A collection of buttons that should be used in the Backstage
          interface. These leverage the properties inherited from{' '}
          <Link href="https://material-ui.com/components/buttons/">
            Material-UI Button
          </Link>
          , but include an opinionated set that align to the Backstage design.
        </Typography>

        <Divider />

        <MemoryRouter>
          <div>
            <div>
              <Location />
            </div>
            {storyFn()}
          </div>
        </MemoryRouter>
      </>
    ),
  ],
};

export const Default = () => {
  const routeRef = createRouteRef({
    path: '/hello',
    title: 'Hi there!',
  });

  // Design Permutations:
  // color   = default | primary | secondary
  // variant = contained | outlined | text
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Default Button:</Typography>
          This is the default button design which should be used in most cases.
          <br />
          <pre>color="primary" variant="contained"</pre>
        </ListItemText>

        <Button to={routeRef.path} color="primary" variant="contained">
          Register Component
        </Button>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Secondary Button:</Typography>
          Used for actions that cancel, skip, and in general perform negative
          functions, etc.
          <br />
          <pre>color="secondary" variant="contained"</pre>
        </ListItemText>

        <Button to={routeRef.path} color="secondary" variant="contained">
          Cancel
        </Button>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Tertiary Button:</Typography>
          Used commonly in a ButtonGroup and when the button function itself is
          not a primary function on a page.
          <br />
          <pre>color="default" variant="outlined"</pre>
        </ListItemText>

        <Button to={routeRef.path} color="default" variant="outlined">
          View Details
        </Button>
      </ListItem>
    </List>
  );
};

export const ButtonLinks = () => {
  const routeRef = createRouteRef({
    path: '/hello',
    title: 'Hi there!',
  });

  const handleClick = () => {
    return 'Your click worked!';
  };

  return (
    <>
      <List>
        {
          // TODO: Refactor to use new routing mechanisms
        }
        <ListItem>
          <Button to={routeRef.path} color="default" variant="outlined">
            Route Ref
          </Button>
          &nbsp; has props for both Material-UI's component as well as for
          react-router-dom's Route object.
        </ListItem>

        <ListItem>
          <Button to="/staticpath" color="default" variant="outlined">
            Static Path
          </Button>
          &nbsp; links to a statically defined route. In general, this should be
          avoided.
        </ListItem>

        <ListItem>
          <MaterialButton
            href="https://backstage.io"
            color="default"
            variant="outlined"
          >
            View URL
          </MaterialButton>
          &nbsp; links to a defined URL using Material-UI's Button.
        </ListItem>

        <ListItem>
          <MaterialButton
            onClick={handleClick}
            color="default"
            variant="outlined"
          >
            Trigger Event
          </MaterialButton>
          &nbsp; triggers an onClick event using Material-UI's Button.
        </ListItem>
      </List>
    </>
  );
};
