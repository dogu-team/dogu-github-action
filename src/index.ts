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

    if (address === '') {
      address = 'https://api.dogutech.io'
    }
    if (timeout === '') {
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
      console.log(`[Running] routine-pipeline-id: ${routinePipelineId}`)
    }
    catch (error: any) {
      if (error.response) {
        core.setFailed(error.response.data.message);
      }
      else {
        core.setFailed(error);
      }
      return;
    }

    const checkState = setInterval(async () => {
      try {
        const pipeline = await getPipeline(address, projectId, routineId, routinePipelineId);
        console.log(`[State] routine-pipeline-id: ${routinePipelineId}, state: ${pipeline.state}`)

        switch (pipeline.state) {
          case 'SUCCESS':
            console.log(`Routine succeeded. Look at the result at dashboard `);
            process.exit(0);
          case 'FAILURE':
          case 'CANCELLED':
          case 'SKIPPED':
            core.setFailed(`Routine failed with state: ${pipeline.state}`);
            clearInterval(checkState);
            process.exit(1);
        }
      }
      catch (error: any) {
        if (error.response) {
          core.setFailed(error.response.data.message);
        }
        else {
          core.setFailed(error);
        }
      }
    }, 5 * 1000)

  } catch (error: any) {
    if (error.response) {
      core.setFailed(error.response.data.message);
    }
    else {
      core.setFailed(error);
    }
  }
})();
