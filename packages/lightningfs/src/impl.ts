import { Doc, DocsStore, ListOpts, ListResult } from '@jotx/core';
import { Decoder, Encoder } from '@jotx/core/src/store';
import { PromisifiedFS } from '@isomorphic-git/lightning-fs';
import { contentAsString } from './util';

export class LightningfsStore implements DocsStore {
  protected fs: PromisifiedFS;
  protected encoder?: Encoder;
  protected decoder?: Decoder;

  constructor(fs: PromisifiedFS, encoder?: Encoder, decoder?: Decoder) {
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
      const doc = decoder(contentAsString(buff));
      return doc as T;
    }

    throw new Error('content is empty');
  }
  write<T extends Doc>(
    docpath: string,
    data: T,
    opts?: { encoder: Encoder<T> } | undefined
  ): Promise<void> {
    const encoder = opts?.encoder || this.encoder;
    if (!encoder) {
      throw new Error('Encoder is required');
    }
    const buff = encoder(data);
    return this.fs.writeFile(docpath, buff);
  }
  list<T extends Doc>(path: string, opts?: ListOpts<T>): Promise<ListResult<T>> {
    throw new Error('Method not implemented.');
  }
  delete(docpath: string): Promise<void> {
    return this.fs.rmdir(docpath);
  }
}
