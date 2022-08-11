import { Dispatch, SetStateAction } from 'react';
import { sleep } from '../../../../topLevelUtil/methods/sleep';
import { Error } from '../../../../topLevelUtil/types/Error';
import type { Log } from '../../../../topLevelUtil/types/Log';

export const fetchLogs = async (
  currentLogsStateFunc: Dispatch<SetStateAction<Log[]>>,
  errorsStateFunc: Dispatch<SetStateAction<Error | null>>,
  initialFetchStateFunc: Dispatch<SetStateAction<boolean>>,
) => {
  let response;

  try {
    response = await fetch('https://localhost:44370/Logs', {
      method: 'GET',
      headers: { accept: 'text/plain' },
      mode: 'cors',
    });
  } catch {
    const error = {
      errorMessage: 'Fetching logs failed',
    };

    errorsStateFunc(error);
    initialFetchStateFunc(true);
    return;
  }

  const logs: Log[] = await response.json();

  if (!logs) {
    const error = {
      errorMessage: 'Fetching logs failed',
    };

    errorsStateFunc(error);
    initialFetchStateFunc(true);
    return;
  }

  if (!Array.isArray(logs)) {
    const error = {
      errorMessage: 'Fetch did not return an array',
    };

    errorsStateFunc(error);
    initialFetchStateFunc(true);
    return;
  }

  currentLogsStateFunc(logs);
  initialFetchStateFunc(true);
};

export const keepLogsUpdated = async (
  currentLogsStateFunc: Dispatch<SetStateAction<Log[]>>,
  updaterRunning: Dispatch<SetStateAction<boolean>>,
  currentWindow: string,
) => {
  while (true) {
    updaterRunning(true);

    if (window.location.pathname !== currentWindow) {
      break;
    }

    await sleep(1000);

    const response = await fetch('https://localhost:44370/Logs', {
      method: 'GET',
      headers: { accept: 'text/plain' },
      mode: 'cors',
    });

    const logs: Log[] = await response.json();

    if (Array.isArray(logs)) {
      currentLogsStateFunc(logs);
    }
  }
};
