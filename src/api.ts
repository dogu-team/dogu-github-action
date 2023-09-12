import axios from 'axios';
import WebSocket from 'ws';
import * as core from '@actions/core';
import FormData from 'form-data';

import { PipelieState } from './types';
import { DoguOption } from './option';

export module API {
  export type RunRoutine = {
    routinePipelineId: number;
    projectId: string;
    routineId: string;
    index: number;
    creatorType: string;
    creatorId: string;
    createdAt: Date;
  };

  export async function runRoutine(
    projectId: string,
    routineId: string,
  ): Promise<RunRoutine> {
    const response = await axios.post<RunRoutine>(
      `${DoguOption.API_URL}/v1/projects/${projectId}/routines/${routineId}/pipelines`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${DoguOption.DOGU_TOKEN}`,
        },
      },
    );

    return response.data;
  }

  export function connectRoutine(
    projectId: string,
    routineId: string,
    routine: RunRoutine,
  ) {
    const socketUrl = DoguOption.getWebSocketUrl();

    const client = new WebSocket(
      `${socketUrl}/v1/pipeline-state?projectId=${projectId}&routineId=${routineId}&pipelineId=${routine.routinePipelineId}`,
      {
        headers: {
          Authorization: `Bearer ${DoguOption.DOGU_TOKEN}`,
        },
      },
    );

    client.on('open', () => {
      console.log(`Wait for routine to finish`);
    });

    client.on('message', (state) => {
      const pipelineState: PipelieState = JSON.parse(state.toString());

      switch (pipelineState.state) {
        case 'SUCCESS':
          console.log(
            `Routine succeeded. Look at the result: ${pipelineState.resultUrl}`,
          );
          process.exit(0);
        case 'FAILURE':
        case 'CANCELLED':
        case 'SKIPPED':
          console.log(
            `Routine ${pipelineState.state.toLowerCase()}. Look at the result: ${pipelineState.resultUrl
            }`,
          );
          process.exit(1);
      }
    });

    client.on('close', (code, reason) => {
      if (code === 1000) {
        process.exit(0);
      } else {
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

  export async function uploadApplication(projectId: string, application: Buffer, applicationName: string, isLatest: boolean) {
    const form = new FormData();
    form.append('file', application, {
      'filename': applicationName,
    });
    form.append('isLatest', isLatest.toString());

    const response = await axios.put(`${DoguOption.API_URL}/v1/projects/${projectId}/applications`, form, {
      headers: {
        ...form.getHeaders(),
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${DoguOption.DOGU_TOKEN}`,
      },
    }
    )

    return response;
  }
}
