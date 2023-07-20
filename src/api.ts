import axios, { AxiosResponse } from "axios";

type RoutineResult = {
  routinePipelineId: number;
  projectId: string;
  routineId: string;
  index: number;
  creatorType: string;
  creatorId: string;
  createdAt: Date;
}

export async function runRoutine(address: string, projectId: string, routineId: string): Promise<RoutineResult> {
  const result = await axios.post<RoutineResult>(`http://${address}/v1/projects/${projectId}/routines/${routineId}/pipelines`, {
    'Authorization': `Bearer ${process.env.DOGU_TOKEN}`,
  })

  return result.data;
}

type PipelieResult = {
  routinePipelineId: number;
  projectId: string;
  routineId: string;
  index: number;
  state: 'UNSPECIFIED' | 'WAITING' | 'IN_PROGRESS' | 'CANCEL_REQUESTED' | 'SUCCESS' | 'FAILURE' | 'SUCCESS' | 'CANCELLED' | 'SKIPPED';
  creatorType: string;
  creatorId: string;
  cancelerId: string;
  createdAt: Date;
  inProgressAt: Date | null;
  completedAt: Date | null;
}

export async function getPipeline(address: string, projectId: string, routineId: string, pipelineId: number): Promise<PipelieResult> {
  const result = await axios.get<PipelieResult>(`http://${address}/v1/projects/${projectId}/routines/${routineId}/pipelines/${pipelineId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.DOGU_TOKEN}`,
    }
  })

  return result.data;
}