import { GitPlatformType } from './git-platform';

export interface RepoConfig {
  name: string;
  title?: string;
  git_remote?: GitRemoteConfig;
}

export interface GitRemoteConfig {
  type: GitPlatformType;
  owner: string;
  repo: string;
  token?: string;
  prefs?: {
    [key: string]: string | number | boolean;
  };
}
