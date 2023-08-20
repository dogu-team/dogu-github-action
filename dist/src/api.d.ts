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
    function runRoutine(projectId: string, routineId: string): Promise<RunRoutine>;
    function connectRoutine(projectId: string, routineId: string, routine: RunRoutine): void;
}
//# sourceMappingURL=api.d.ts.map