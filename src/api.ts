import axios from "axios";

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

  export async function runRoutine(address: string, projectId: string, routineId: string): Promise<RunRoutine> {
    const result = await axios.post<RunRoutine>(`${address}/v1/projects/${projectId}/routines/${routineId}/pipelines`, undefined, {
      headers: {
        'Authorization': `Bearer ${process.env.DOGU_TOKEN}`,
      }
    })

    return result.data;
  }
}