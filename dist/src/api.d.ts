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
    function runRoutine(address: string, projectId: string, routineId: string): Promise<RunRoutine>;
}
//# sourceMappingURL=api.d.ts.map