import { Doc } from '../models/doc';

export interface ListOpts<T extends Doc> {
  limit?: number;
  projection?: Record<keyof T, boolean>;
  enoder: Encoder<T>;
}

export interface ListResult<T extends Doc> {
  data: T[];
}

export type EncodingType = 'markdown';

export type Encoder<T extends Doc = Doc> = (doc: T) => Buffer;
export type Decoder<T extends Doc = Doc> = (buffer: Buffer) => T;
