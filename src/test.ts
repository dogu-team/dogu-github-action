import './types'
import { API } from './api';
import WebSocket from "ws";
import { runRoutine } from './routine';

(async () => {
  const apiUrl = 'http://localhost:4000'
  const projectId = '9e90209a-66bb-4e9b-8f35-bbc872a499b9';
  const routineId = '8a2127c0-c2f9-46e1-b056-dfc0c1209c19';
  process.env.DOGU_TOKEN = 'dogu-project-token-xo5kwjv5zhathsp8sw3k6m12j038'

  await runRoutine(
    apiUrl,
    projectId,
    routineId,
  )
})();
