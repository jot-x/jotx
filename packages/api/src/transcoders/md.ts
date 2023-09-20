import { asString, type Stats } from '@jotx/fs';
import { FrontmatterDoc } from '../models/fmdoc';
import { Transcoder } from '../models/transcoder';
import { docToMd, mdToDoc } from '../utils/md';
import { Doc } from '@jotx/core';

const encoder: (doc: Doc) => string = (doc) => {
  return docToMd(doc as FrontmatterDoc);
};

const decoder: (content: Uint8Array, path: string, stats: Stats) => FrontmatterDoc = (
  content,
  path,
  stats
) => {
  const str = asString(content);
  const note = mdToDoc(str, path, stats);
  return note;
};

const trans: Transcoder = {
  encoder,
  decoder
};

export default trans;
