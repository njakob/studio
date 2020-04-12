import { getCommitHash } from './get-commit-hash';

export function getBuildInfo() {
  return {
    commitHash: getCommitHash(),
    buildTime: Date.now(),
  };
}
