import './types';
import * as core from '@actions/core';

import { setExitTimeout } from './timeout';
import { runRoutine } from './routine';
import { DoguOption } from './option';

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

    if (apiUrl !== '') {
      DoguOption.API_URL = apiUrl;
    }
    if (timeout !== '') {
      DoguOption.TIMEOUT_MILLISECONDS = timeout;
    }

    console.log(`API URL: ${DoguOption.API_URL}`);
    setExitTimeout(Number(DoguOption.TIMEOUT_MILLISECONDS));

    await runRoutine(projectId, routineId);
  } catch (error: any) {
    if (error.response) {
      core.setFailed(error.response.data.message);
    } else {
      core.setFailed(error);
    }

    process.exit(1);
  }
})();
