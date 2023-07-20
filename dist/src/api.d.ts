type RoutineResult = {
    routinePipelineId: number;
    projectId: string;
    routineId: string;
    index: number;
    creatorType: string;
    creatorId: string;
    createdAt: Date;
};
export declare function runRoutine(address: string, projectId: string, routineId: string): Promise<RoutineResult>;
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
};
export declare function getPipeline(address: string, projectId: string, routineId: string, pipelineId: number): Promise<PipelieResult>;
export {};
//# sourceMappingURL=api.d.ts.map