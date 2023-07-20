import * as core from '@actions/core';

import './types'
import { getPipeline, runRoutine } from './api';

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

    if (address === undefined) {
      address = 'https://api.dogutech.io'
    }
    if (timeout === undefined) {
      timeout = String(60 * 60 * 1000);
    }

    setTimeout(() => {
      core.setFailed(`Timeout after ${timeout}ms`);
      process.exit(1);
    }, Number(timeout))

    let routinePipelineId: number;
    try {
      const routine = await runRoutine(address, projectId, routineId);
      routinePipelineId = routine.routinePipelineId;
    }
    catch (error: any) {
      core.setFailed(error.response.data.message);
      return;
    }

    const checkState = setInterval(async () => {
      try {
        const pipeline = await getPipeline(address, projectId, routineId, routinePipelineId);

        switch (pipeline.state) {
          case 'SUCCESS':
            process.exit(0);
          case 'FAILURE':
          case 'CANCELLED':
          case 'SKIPPED':
            core.setFailed(`Routine failed with state: ${pipeline.state}`);
            clearInterval(checkState);
            return;
        }
      }
      catch (error: any) {
        core.setFailed(error.response.data.message);
      }
    }, 5 * 1000)

  } catch (error: any) {
    core.setFailed(error.response.data.message);
  }
})();
