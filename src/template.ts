import * as core from '@actions/core';
import fs from "fs/promises"

import { API } from '../src/api';
import path from 'path';

export const Template = {
  'run_routine': async () => {
    let routine: API.RunRoutine;

    const projectId = core.getInput('project-id');
    const routineId = core.getInput('routine-id');

    try {
      routine = await API.runRoutine(projectId, routineId);
      console.log(
        `Spawn pipeline, project-id: ${projectId}, routine-id: ${routineId} routine-pipeline-id: ${routine.routinePipelineId}`,
      );
    } catch (error: any) {
      if (error.response) {
        core.setFailed(error.response.data.message);
      } else {
        core.setFailed(error);
      }
      process.exit(1);
    }

    API.connectRoutine(projectId, routineId, routine);
  },

  'upload_application': async () => {
    const projectId = core.getInput('project-id');
    const filePath = core.getInput('file-path');

    try {
      const application = await fs.readFile(filePath);
      const applicationName = path.basename(filePath);
      const response = await API.uploadApplication(projectId, application, applicationName);
    }
    catch (error: any) {
      if (error.response) {
        core.setFailed(error.response.data.message);
      } else {
        core.setFailed(error);
      }
      process.exit(1);
    }
  }
}