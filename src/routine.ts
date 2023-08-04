import './types'
import * as core from '@actions/core';
import WebSocket from "ws";

import { API } from './api';
import { PipelieState } from './types';


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

  const apiUrlObj = new URL(apiUrl);
  const client = new WebSocket(`ws://${apiUrlObj.hostname}/v1/pipeline-state?projectId=${projectId}&routineId=${routineId}&pipelineId=${routine.routinePipelineId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.DOGU_TOKEN}`
    }
  });

  client.on('message', (state) => {
    const pipelineState: PipelieState = JSON.parse(state.toString());

    switch (pipelineState.state) {
      case 'SUCCESS':
        console.log(`Routine succeeded. Look at the result: ${pipelineState.resultUrl}`);
        process.exit(0);
      case 'FAILURE':
      case 'CANCELLED':
      case 'SKIPPED':
        console.log(`Routine ${pipelineState.state.toLowerCase()}. Look at the result: ${pipelineState.resultUrl}`);
        process.exit(1);
    }
  })

  client.on('close', (code, reason) => {
    if (code === 1000) {
      process.exit(0);
    }
    else {
      core.setFailed(reason.toString());
      process.exit(1);
    }
  });

  client.on('error', (error) => {
    core.setFailed(error.toString());
    process.exit(1);
  });
}