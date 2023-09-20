import { Decoder, Encoder } from '@jotx/core';

export interface Transcoder {
  encoder: Encoder;
  decoder: Decoder;
}
