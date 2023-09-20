import { Doc } from '../models/doc';
import { ListOpts, ListResult, Decoder, Encoder } from './types';

export interface DocStore {
  read<T extends Doc>(docpath: string, opts?: { decoder: Decoder<T> }): Promise<T>;
  write<T extends Doc>(docpath: string, data: T, opts?: { encoder: Encoder<T> }): Promise<void>;
  list<T extends Doc>(path: string, opts?: ListOpts<T>): Promise<ListResult<T>>;
  delete(docpath: string): Promise<void>;
  rename(docpath: string, newPath: string): Promise<void>;
}
