/**
 * A commit object.
 */
export interface CommitObject {
  /**
   * Commit message
   */
  message: string;
  /**
   * Ancestors commit ids
   */
  parent: string[];
  author: {
    /**
     * The author's name
     */
    name: string;
    /**
     * The author's email
     */
    email: string;
    /**
     * UTC Unix timestamp in seconds
     */
    timestamp: number;
    /**
     * Timezone difference from UTC in minutes
     */
    timezoneOffset: number;
  };
  committer: {
    /**
     * The committer's name
     */
    name: string;
    /**
     * The committer's email
     */
    email: string;
    /**
     * UTC Unix timestamp in seconds
     */
    timestamp: number;
    /**
     * Timezone difference from UTC in minutes
     */
    timezoneOffset: number;
  };
  /**
   * PGP signature (if present)
   */
  gpgsig?: string;
}
