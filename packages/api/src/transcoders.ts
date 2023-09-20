import { Transcoder } from './models/transcoder';
import md from './transcoders/md';

const transcoders: Record<string, Transcoder> = {
  md
};

export { transcoders };
