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
import { ilertApiRef, TableState } from '../api';
import { useApi, errorApiRef } from '@backstage/core';
import { AuthenticationError } from '@backstage/errors';
import { useAsyncRetry } from 'react-use';
import { UptimeMonitor } from '../types';

export const useUptimeMonitors = () => {
  const ilertApi = useApi(ilertApiRef);
  const errorApi = useApi(errorApiRef);

  const [tableState, setTableState] = React.useState<TableState>({
    page: 0,
    pageSize: 10,
  });
  const [uptimeMonitorsList, setUptimeMonitorsList] = React.useState<
    UptimeMonitor[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { error, retry } = useAsyncRetry(async () => {
    try {
      setIsLoading(true);
      const data = await ilertApi.fetchUptimeMonitors();
      setUptimeMonitorsList(data || []);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!(e instanceof AuthenticationError)) {
        errorApi.post(e);
      }
      throw e;
    }
  }, [tableState]);

  const onUptimeMonitorChanged = (newUptimeMonitor: UptimeMonitor) => {
    setUptimeMonitorsList(
      uptimeMonitorsList.map(
        (uptimeMonitor: UptimeMonitor): UptimeMonitor => {
          if (newUptimeMonitor.id === uptimeMonitor.id) {
            return newUptimeMonitor;
          }

          return uptimeMonitor;
        },
      ),
    );
  };

  const onChangePage = (page: number) => {
    setTableState({ ...tableState, page });
  };
  const onChangeRowsPerPage = (pageSize: number) => {
    setTableState({ ...tableState, pageSize });
  };

  return [
    {
      tableState,
      uptimeMonitors: uptimeMonitorsList,
      error,
      isLoading,
    },
    {
      setTableState,
      setUptimeMonitorsList,
      retry,
      onUptimeMonitorChanged,
      onChangePage,
      onChangeRowsPerPage,
      setIsLoading,
    },
  ] as const;
};
