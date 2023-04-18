import { execSync } from 'child_process';

export const getCommitId = (length: number = 0): string => {
  try {
    const commitId = execSync(
      length ? `git rev-parse --short=${length} HEAD` : `git rev-parse HEAD`,
      {
        encoding: 'utf-8'
      }
    ).trim();

    return commitId;
  } catch (error) {
    return '';
  }
};

export const getShortCommitId = (length: number = 7): string => {
  return getCommitId(length);
};
