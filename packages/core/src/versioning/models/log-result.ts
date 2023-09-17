import { CommitObject } from "./commit";

export interface LogResult {
  /**
   * The hash of the commit
   * In git, ths is the SHA-1 object id of the commit
   */
  oid: string;
  /**
   * The commit object
   */
  commit: CommitObject;
  /**
   * PGP signing payload
   */
  payload: string;
}
