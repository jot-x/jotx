export interface FetchResult {
  /**
   * The hash of the fetched head commit
   * In git, this is the SHA-1 object id of the fetched head commit
   */
  fetchHead: string | null;

  /**
   * The HTTP response headers returned by the version control (e.g., "git") server
   */
  headers?: {
    [x: string]: string;
  };
}
