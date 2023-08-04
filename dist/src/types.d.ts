export {};
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DOGU_TOKEN: string;
        }
    }
}
export type PipelieState = {
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
    resultUrl: string;
};
//# sourceMappingURL=types.d.ts.map