import type {
  DocsRemoteVersionControl,
  DocsVersionControl,
  FetchResult,
  FileStatus,
  HttpClient,
  LogResult,
  PushResult
} from '@jotx/core';
import { CommitResult } from '@jotx/core/src/versioning/models/commit-result';
import { User } from '@jotx/core/src/versioning/models/user';
import { CallbackFsClient, init, listFiles, add, status, commit, log, clone } from 'isomorphic-git';

export class GitVersioning implements DocsVersionControl, DocsRemoteVersionControl {
  protected fs: CallbackFsClient;
  protected dir: string;
  protected httpClient?: HttpClient;

  constructor(fs: CallbackFsClient, dir: string, httpClient?: HttpClient) {
    this.fs = fs;
    this.dir = dir;
    this.httpClient = httpClient;
  }

  // local
  //
  async init(): Promise<void> {
    await init({ fs: this.fs, dir: this.dir });
  }
  async list(): Promise<string[]> {
    return await listFiles({ fs: this.fs, dir: this.dir });
  }
  async log(): Promise<LogResult[]> {
    const result = await log({ fs: this.fs, dir: this.dir });
    return result.map((r) => ({ oid: r.oid, commit: r.commit, payload: r.payload }));
  }
  async add({ filepaths }: { filepaths: string | string[] }): Promise<void> {
    return add({ fs: this.fs, dir: this.dir, filepath: filepaths });
  }
  async commit({ message, author }: { message: string; author: User }): Promise<CommitResult> {
    const sha = await commit({ fs: this.fs, dir: this.dir, message, author });
    return {
      hash: sha
    };
  }
  async status({ filepath }: { filepath: string }): Promise<FileStatus> {
    const result = await status({ fs: this.fs, dir: this.dir, filepath });
    return result;
  }

  // remote
  //
  async clone({ url, depth }: { url: string; depth?: number }): Promise<void> {
    if (!this.httpClient) {
      throw new Error('http client is required');
    }
    await clone({ fs: this.fs, dir: this.dir, http: this.httpClient, url, depth });
    return;
  }
  fetch(): Promise<FetchResult> {
    throw new Error('Method not implemented.');
  }
  push(): Promise<PushResult> {
    throw new Error('Method not implemented.');
  }
}
