export interface PromiseFS {
  /**
   * Make directory
   * @param filepath
   * @param options
   */
  mkdir(filepath: string, options?: MKDirOptions): Promise<void>;

  /**
   * Remove directory
   * @param filepath
   * @param options
   */
  rmdir(filepath: string, options?: undefined): Promise<void>;

  /**
   * Read directory
   *
   * The Promise return value is an Array of strings. NOTE: To save time, it is NOT SORTED. (Fun fact: Node.js' readdir output is not guaranteed to be sorted either. I learned that the hard way.)
   * @param filepath
   * @param options
   * @returns The file list.
   */
  readdir(filepath: string, options?: undefined): Promise<string[]>;

  writeFile(
    filepath: string,
    data: Uint8Array | string,
    options?: WriteFileOptions | string
  ): Promise<void>;

  readFile(filepath: string, options: 'utf8' | { encoding: 'utf8' }): Promise<string | Uint8Array>;
  readFile(filepath: string, options?: {}): Promise<string | Uint8Array>;

  /**
   * Delete a file
   * @param filepath
   * @param options
   */
  unlink(filepath: string, options?: undefined): Promise<void>;

  /**
   * Rename a file or directory
   * @param oldFilepath
   * @param newFilepath
   */
  rename(oldFilepath: string, newFilepath: string): Promise<void>;

  /**
   * The result is a Stat object similar to the one used by Node but with fewer and slightly different properties and methods.
   * @param filepath
   * @param options
   */
  stat(filepath: string, options?: undefined): Promise<Stats>;

  /**
   * Like fs.stat except that paths to symlinks return the symlink stats not the file stats of the symlink's target.
   * @param filepath
   * @param options
   */
  lstat(filepath: string, options?: undefined): Promise<Stats>;

  /**
   * Create a symlink at filepath that points to target.
   * @param target
   * @param filepath
   */
  symlink(target: string, filepath: string): Promise<void>;

  /**
   * Read the target of a symlink.
   * @param filepath
   * @param options
   * @returns The link string.
   */
  readlink(filepath: string, options?: undefined): Promise<string>;

  /**
   * @param filepath
   * @returns The size of a file or directory in bytes.
   */
  du(filepath: string): Promise<number>;
  /**
   * Function that saves anything that need to be saved in IndexedBD or custom IDB object. Right now it saves SuperBlock so it's save to dump the object as dump it into a file (e.g. from a Browser)
   * @returns Promise that resolves when super block is saved to file
   */
  flush(): Promise<void>;
}

export interface ReadFileOptions {
  encoding?: 'utf8';
}

export interface WriteFileOptions {
  /**
   * Posix mode permissions
   * @default 0o777
   */
  mode: number;
  encoding?: 'utf8';
}

export interface MKDirOptions {
  /**
   * Posix mode permissions
   * @default 0o777
   */
  mode: number;
}

export interface Stats {
  type: 'file' | 'dir';
  mode: any;
  size: number;
  ino: any;
  mtimeMs: any;
  ctimeMs: any;
  uid: 1;
  gid: 1;
  dev: 1;
  isFile(): boolean;
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
}
