export module DoguOption {
  export let DOGU_TOKEN = process.env.DOGU_TOKEN;
  export let API_URL: string = 'https://api.dogutech.io';
  export let TIMEOUT_MILLISECONDS: string = String(3 * 60 * 60 * 1000);

  export function getWebSocketUrl(): string {
    const apiURL = new URL(API_URL);
    let socketUrl = '';

    if (apiURL.protocol === 'http:') {
      socketUrl =
        apiURL.port === ''
          ? `ws://${apiURL.hostname}`
          : `ws://${apiURL.hostname}:${apiURL.port}`;
    } else if (apiURL.protocol === 'https:') {
      socketUrl =
        apiURL.port === ''
          ? `wss://${apiURL.hostname}`
          : `wss://${apiURL.hostname}:${apiURL.port}`;
    } else {
      console.error(`Unsupported protocol: ${apiURL.protocol}`);
    }

    return socketUrl;
  }
}
