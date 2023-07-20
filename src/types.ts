export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOGU_TOKEN: string;
    }
  }
}