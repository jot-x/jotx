import { Doc, ListResult, PromiseFS, ListOpts, Decoder, Encoder } from '@jotx/core';
import { asString } from './utils/data';
import { mkdirp, readdirRecursive } from './utils/fs';

export class FileSystemDocStore {
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
    const buff = await this.fs.readFile(docpath);
    const decoder = opts?.decoder || this.decoder;
    if (!decoder) {
      throw new Error('decoder is required');
    }
    if (buff) {
      const doc = decoder(asString(buff));
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
    await mkdirp(this.fs, paths);
    return this.fs.writeFile(docpath, buff);
  }
  async list<T extends Doc>(path: string, opts?: ListOpts<T> | undefined): Promise<ListResult<T>> {
    // TODO support limit & skip
    const decoder = opts?.decoder || this.decoder;
    if (!decoder) {
      throw new Error('decoder is required');
    }
    let files: string[] = [];
    if (opts?.recursive) {
      // readdirRecursive
      files = files.concat(await readdirRecursive(this.fs, path));
      if (opts.filter) {
        files = files.filter(opts.filter);
      }
    } else {
      const entries = await this.fs.readdir(path);
      for (const entry of entries) {
        const entryPath = `${path}/${entry}`;
        const stat = await this.fs.stat(entryPath);
        if (!stat.isDirectory()) {
          files.push(entryPath);
        }
      }
    }
    const data = await resolvePathsToDocs<T>(this.fs, files, decoder);
    return {
      data
    };
  }
  delete(docpath: string): Promise<void> {
    // TODO support deleting a folder
    return this.fs.unlink(docpath);
  }
}
async function resolvePathToDocs<T extends Doc>(
  fs: PromiseFS,
  path: string,
  decoder: Decoder
): Promise<T> {
  const data = await fs.readFile(path);
  return decoder(asString(data), path) as T;
}
async function resolvePathsToDocs<T extends Doc>(
  fs: PromiseFS,
  files: string[],
  decoder: Decoder
): Promise<T[]> {
  return Promise.all(files.map((f) => resolvePathToDocs<T>(fs, f, decoder)));
}
