import * as core from '@actions/core';

export function setExitTimeout(timeout: number) {
  setTimeout(() => {
    core.setFailed(`Timeout after ${timeout}ms`);
    process.exit(1);
  }, timeout)
}