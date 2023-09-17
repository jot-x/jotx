import { FetchResult } from './models/fetch-result';
import { PushResult } from './models/push-result';

export interface DocsRemoteVersionControl {
  /**
   * Clone a repository, including docs and their tracking data.
   */
  clone({ url, depth }: { url: string; depth?: number }): Promise<void>;

  /**
   * Fetch commits from a remote repository
   *
   * aka: `git fetch`
   */
  fetch(): Promise<FetchResult>;

  /**
   * Push a branch or tag to a remote
   *
   * aka `git push`
   */
  push(): Promise<PushResult>;

  // TODO merge
}
