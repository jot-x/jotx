import { CommitResult } from './models/commit-result';
import { FileStatus } from './models/file-status';
import { LogResult } from './models/log-result';
import { User } from './models/user';

export interface DocsVersionControl {
  /**
   * Initialize a new repository
   *
   * aka: `git init`
   */
  init(): Promise<void>;

  /**
   * List all docs in the index or in a commit
   *
   * aka: `git ls-tree -r main
   *
   * Note that probably git implementation, when listing all files in a commit, this requires recursively walking through
   * the entire git object store which is not that efficient performance wise. If no complete listing of every file is
   * required then better performance can be achieved by using `walk` and ignoring irrelevant subdirectories.
   */
  list(): Promise<string[]>;

  /**
   * Get commit descriptions from the tracking history.
   *
   * aka `git log`
   */
  log(): Promise<LogResult[]>;

  /**
   * Add files to the index.
   *
   * aka `git add <files>`
   *
   * In git, this is the git index (aka staging area)
   * @param filepaths
   */
  add({ filepaths }: { filepaths: string | string[] }): Promise<void>;

  /**
   * Create a new commit
   */
  commit({ message, author }: { message: string; author: User }): Promise<CommitResult>;

  /**
   * Tells if a file has changed
   */
  status({ filepath }: { filepath: string }): Promise<FileStatus>;

  /**
   * Tells if multiple files have been changed.
   *
   * aka: `git status <filepath>`
   * @param args.filepaths optionally limit the query for the given files and directories
   * @param args.filter filter the result by the given filter function
   */
  // status({
  //   filepaths,
  //   filter
  // }: {
  //   filepaths: string[];
  //   filter: (pathname: string) => boolean;
  // }): Promise<[FileMatrixStatus]>;
}
