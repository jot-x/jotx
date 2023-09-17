import { Doc, DocsStore, ListOpts, ListResult } from '@jotx/core';
import { Decoder, Encoder } from '@jotx/core/src/store';
import { FSModule } from 'browserfs/dist/node/core/FS';

export class BrowserFSStore implements DocsStore {
  protected fs: FSModule;
  protected encoder?: Encoder;
  protected decoder?: Decoder;

  constructor(fs: FSModule, encoder?: Encoder, decoder?: Decoder) {
    this.fs = fs;
    this.encoder = encoder;
    this.decoder = decoder;
  }

  async read<T extends Doc>(
    docpath: string,
    opts?: { decoder: Decoder<T> } | undefined
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.fs.readFile(docpath, (err, buff) => {
        if (err) {
          reject(err);
          return;
        }

        if (!buff) {
          reject('buffer is empty');
          return;
        }

        const decoder = opts?.decoder || this.decoder;
        if (!decoder) {
          reject('decoder is required');
          return;
        }

        if (buff) {
          const doc = decoder(buff);
          resolve(doc as T);
        }
      });
    });
  }
  write<T extends Doc>(
    docpath: string,
    data: T,
    opts?: { encoder: Encoder<T> } | undefined
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const encoder = opts?.encoder || this.encoder;

      if (!encoder) {
        reject('Encoder is required');
        return;
      }

      const buff = encoder(data);
      this.fs.writeFile(docpath, buff);
    });
  }
  list<T extends Doc>(path: string, opts?: ListOpts<T>): Promise<ListResult<T>> {
    throw new Error('Method not implemented.');
  }
  delete(docpath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.fs.unlink(docpath, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}
