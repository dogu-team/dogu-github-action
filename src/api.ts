import axios from "axios";
import WebSocket from "ws";
import * as core from '@actions/core';

import { PipelieState } from './types';

export module API {
  export type RunRoutine = {
    routinePipelineId: number;
    projectId: string;
    routineId: string;
    index: number;
    creatorType: string;
    creatorId: string;
    createdAt: Date;
  }

  function getSocketUrl(apiUrl: string) {
    const apiUrlObj = new URL(apiUrl);
    let socketUrl = '';
  
    if (apiUrlObj.protocol === 'http:') {
      socketUrl = apiUrlObj.port === '' ? `ws://${apiUrlObj.hostname}` : `ws://${apiUrlObj.hostname}:${apiUrlObj.port}`;
    }
    else if (apiUrlObj.protocol === 'https:') {
      socketUrl = apiUrlObj.port === '' ? `wss://${apiUrlObj.hostname}` : `wss://${apiUrlObj.hostname}:${apiUrlObj.port}`;
    }
    else {
      core.setFailed(`Unsupported protocol: ${apiUrlObj.protocol}`);
      process.exit(1);
    }
  }

  export async function runRoutine(apiUrl: string, projectId: string, routineId: string): Promise<RunRoutine> {
    const result = await axios.post<RunRoutine>(`${apiUrl}/v1/projects/${projectId}/routines/${routineId}/pipelines`, undefined, {
      headers: {
        'Authorization': `Bearer ${process.env.DOGU_TOKEN}`,
      }
    })

    return result.data;
  }

  export async function connectRoutine(apiUrl: string, projectId: string, routineId: string, routine: RunRoutine) {
    const socketUrl = getSocketUrl(apiUrl);

    const client = new WebSocket(`${socketUrl}/v1/pipeline-state?projectId=${projectId}&routineId=${routineId}&pipelineId=${routine.routinePipelineId}`, {
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
      console.error(error);
      core.setFailed(error.toString());
      process.exit(1);
    });
  }
}