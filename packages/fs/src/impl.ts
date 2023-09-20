import { Decoder, Doc, DocStore, Encoder, ListOpts, ListResult } from '@jotx/core';
import { PromiseFS, Stats } from './filesystem';
import { FileStats } from './models';
import { mkdirp, readdirRecursive } from './utils/fs';

export class FileSystemDocStore implements DocStore {
  protected fs: PromiseFS;
  protected encoder?: Encoder;
  protected decoder?: Decoder;
  constructor(fs: PromiseFS, encoder?: Encoder, decoder?: Decoder) {
    this.fs = fs;
    this.encoder = encoder;
    this.decoder = decoder;
  }
  async read<T extends Doc>(
    docpath: string,
    opts?: { decoder: Decoder<T> } | undefined
  ): Promise<T> {
    let buff = await this.fs.readFile(docpath);
    const decoder = opts?.decoder || this.decoder;
    if (!decoder) {
      throw new Error('decoder is required');
    }
    const stats = await this.fs.stat(docpath);
    if (buff) {
      if (typeof buff === 'string') {
        buff = new TextEncoder().encode(buff);
      }
      const doc = decoder(buff, docpath, stats);
      return doc as T;
    }
    throw new Error('content is empty');
  }
  async write<T extends Doc>(
    docpath: string,
    data: T,
    opts?: { encoder: Encoder<T> } | undefined
  ): Promise<void> {
    const encoder = opts?.encoder || this.encoder;
    if (!encoder) {
      throw new Error('Encoder is required');
    }
    const buff = encoder(data);
    const paths = docpath.substring(0, docpath.lastIndexOf('/'));
    if (paths) await mkdirp(this.fs, paths);
    return this.fs.writeFile(docpath, buff);
  }
  async list<T extends Doc>(path: string, opts?: ListOpts<T> | undefined): Promise<ListResult<T>> {
    // TODO support limit & skip
    const decoder = opts?.decoder || this.decoder;
    if (!decoder) {
      throw new Error('decoder is required');
    }
    let files: { path: string; stats: Stats }[] = [];

    if (opts?.recursive) {
      files = files.concat(await readdirRecursive(this.fs, path));
      if (opts?.filter) {
        files = files.filter((e) => opts.filter!(e.path, e.stats));
      }
    } else {
      const entries = await this.fs.readdir(path);
      for (const entry of entries) {
        const entryPath = `${path}/${entry}`;
        const stats = await this.fs.stat(entryPath);
        if (!stats.isDirectory()) {
          files.push({ path: entryPath, stats });
        }
      }
    }
    const data = await resolvePathsToDocs<T>(this.fs, files, decoder);
    return {
      data
    };
  }
  async delete(docpath: string): Promise<void> {
    // TODO support deleting a folder
    return this.fs.unlink(docpath);
  }
  async rename(docpath: string, newPath: string): Promise<void> {
    return this.fs.rename(docpath, newPath);
  }
}

async function resolvePathToDocs<T extends Doc>(
  fs: PromiseFS,
  path: string,
  stat: Stats,
  decoder: Decoder
): Promise<T> {
  let data = await fs.readFile(path);
  if (typeof data === 'string') data = new TextEncoder().encode(data);
  return decoder(data, path, stat) as T;
}
async function resolvePathsToDocs<T extends Doc>(
  fs: PromiseFS,
  files: FileStats[],
  decoder: Decoder
): Promise<T[]> {
  return Promise.all(files.map((f) => resolvePathToDocs<T>(fs, f.path, f.stats, decoder)));
}
