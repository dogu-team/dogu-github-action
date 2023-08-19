import './types'
import * as core from '@actions/core';

import { API } from './api';


export async function runRoutine(apiUrl: string, projectId: string, routineId: string) {
  let routine: API.RunRoutine;

  try {
    routine = await API.runRoutine(apiUrl, projectId, routineId);
    console.log(`Spawn pipeline, project-id: ${projectId}, routine-id: ${routineId} routine-pipeline-id: ${routine.routinePipelineId}`)
  }
  catch (error: any) {
    if (error.response) {
      core.setFailed(error.response.data.message);
    }
    else {
      core.setFailed(error);
    }
    process.exit(1);
  }

  API.connectRoutine(apiUrl, projectId, routineId, routine);
}