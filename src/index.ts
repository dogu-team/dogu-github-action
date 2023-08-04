import './types'
import * as core from '@actions/core';

import { setExitTimeout } from './timeout';
import { runRoutine } from './routine';

(async () => {
  try {
    const projectId = core.getInput('project-id');
    const routineId = core.getInput('routine-id');
    let apiUrl = core.getInput('api-url', {
      required: false,
    });
    let timeout = core.getInput('timeout', {
      required: false,
    });

    if (apiUrl === '') {
      apiUrl = 'https://api.dogutech.io'
    }
    if (timeout === '') {
      timeout = String(60 * 60 * 1000);
    }

    setExitTimeout(Number(timeout));
    await runRoutine(apiUrl, projectId, routineId);

  } catch (error: any) {
    if (error.response) {
      core.setFailed(error.response.data.message);
    }
    else {
      core.setFailed(error);
    }

    process.exit(1);
  }
})();
