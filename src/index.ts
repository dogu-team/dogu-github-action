import './types';
import * as core from '@actions/core';

import { Template } from "./template"
import { setExitTimeout } from './timeout';
import { DoguOption } from './option';

(async () => {
  try {
    const template = core.getInput('template') as keyof typeof Template;

    let apiUrl = core.getInput('api-url', {
      required: false,
    });
    let timeout = core.getInput('timeout', {
      required: false,
    });

    if (apiUrl !== '') {
      DoguOption.API_URL = apiUrl;
    }
    if (timeout !== '') {
      DoguOption.TIMEOUT_MILLISECONDS = timeout;
    }

    console.log(`API URL: ${DoguOption.API_URL}`);
    setExitTimeout(Number(DoguOption.TIMEOUT_MILLISECONDS));

    await Template[template]();
  } catch (error: any) {
    if (error.response) {
      core.setFailed(error.response.data.message);
    } else {
      core.setFailed(error);
    }

    process.exit(1);
  }
})();
