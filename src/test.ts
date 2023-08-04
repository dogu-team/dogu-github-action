import './types'
import { API } from './api';
import WebSocket from "ws";

(async () => {
  const apiUrl = 'http://localhost:4000'
  const projectId = '9e90209a-66bb-4e9b-8f35-bbc872a499b9';
  const routineId = '8a2127c0-c2f9-46e1-b056-dfc0c1209c19';
  const timeout = 60 * 60 * 1000;

  setTimeout(() => {
    process.exit(1);
  }, timeout)

  let routine: API.RunRoutine;
  try {
    routine = await API.runRoutine(apiUrl, projectId, routineId);
  }
  catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message)
    }
    else {
      console.error(error)
    }
    return;
  }

  const wsc = new WebSocket(`ws://localhost:4000/v1/pipeline-state?projectId=${projectId}&routineId=${routineId}&pipelineId=${routine.routinePipelineId}`, {
    headers: {
      'Authorization': `Bearer dogu-project-token-xo5kwjv5zhathsp8sw3k6m12j038`
    }
  });

  wsc.on('error', console.error);

  wsc.on('close', (code, message) => {
    console.log('disconnected', code);
  })

  wsc.on('open', function open() {
    wsc.send('something');
  });

  wsc.on('message', function message(data) {
    console.log('received: %s', data);
  });

})();
