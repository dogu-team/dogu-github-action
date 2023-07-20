import './types'
import { getPipeline, runRoutine } from './api';

(async () => {
  const address = 'localhost:4000'
  const projectId = 'a5792d9b-a8e8-4ab8-b790-3a503c5a8789';
  const routineId = 'c3218f5f-02bf-43a1-9eb3-acd2753e7567';
  const timeout = 60 * 60 * 1000;

  setTimeout(() => {
    process.exit(1);
  }, timeout)

  let routinePipelineId: number;
  try {
    const routine = await runRoutine(address, projectId, routineId);
    routinePipelineId = routine.routinePipelineId;
  }
  catch (error: any) {
    console.error(error.response.data.message)
    return;
  }

  const checkState = setInterval(async () => {
    try {
      const pipeline = await getPipeline(address, projectId, routineId, routinePipelineId);

      switch (pipeline.state) {
        case 'SUCCESS':
        case 'FAILURE':
        case 'CANCELLED':
        case 'SKIPPED':
          console.log(pipeline.state);
          clearInterval(checkState);
          return;
      }
    }
    catch (error: any) {
      console.error(error.response.data.message)
    }
  }, 5 * 1000)
})();
