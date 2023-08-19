export declare module API {
    type RunRoutine = {
        routinePipelineId: number;
        projectId: string;
        routineId: string;
        index: number;
        creatorType: string;
        creatorId: string;
        createdAt: Date;
    };
    function runRoutine(apiUrl: string, projectId: string, routineId: string): Promise<RunRoutine>;
    function connectRoutine(apiUrl: string, projectId: string, routineId: string, routine: RunRoutine): Promise<void>;
}
//# sourceMappingURL=api.d.ts.map