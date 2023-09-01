import '../src/types';
import { API } from '../src/api';
import WebSocket from 'ws';
import fs from "fs/promises"

import { DoguOption } from '../src/option';
import path from 'path';

(async () => {
  const projectId = 'a5253e3a-33b7-4117-a13d-f5c5d75e8c56';
  DoguOption.API_URL = 'http://localhost:4000';
  DoguOption.DOGU_TOKEN = 'dogu-project-token-h0ktyruqmfshn29v43zbzmbigm56';

  const filePath = './warehouseinvasion.apk';
  const application = await fs.readFile(filePath);
  const applicationName = path.basename(filePath);
  try {
    await API.uploadApplication(projectId, application, applicationName)
  }
  catch (error: any) {
    console.log(error.response.data.message)
  }
})();
