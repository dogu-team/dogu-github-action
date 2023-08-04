import './types'
import * as core from '@actions/core';

import { setExitTimeout } from './timeout';
import { runRoutine } from './routine';

(async () => {
  try {
    const projectId = core.getInput('project-id');
    const routineId = core.getInput('routine-id');
    let address = core.getInput('address', {
      required: false,
    });
    let timeout = core.getInput('timeout', {
      required: false,
    });

    if (address === '') {
      address = 'api.dogutech.io'
    }
    if (timeout === '') {
      timeout = String(60 * 60 * 1000);
    }

    setExitTimeout(Number(timeout));
    await runRoutine(address, projectId, routineId);

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
