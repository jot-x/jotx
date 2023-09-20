import { Doc, DocStore } from '@jotx/core';
import { getFileExtension } from '../../utils/files';
import { transcoders } from '../../transcoders';

interface Params {
  path: string;
}

/**
 * Get a doc
 *
 * @param store
 * @param param1
 * @returns
 */
export async function readDoc<T extends Doc>(store: DocStore, { path = '/' }: Params) {
  const ext = getFileExtension(path);
  if (!ext) {
    throw new Error('path must end with file extension');
  }
  const { decoder } = transcoders[ext];
  return store.read<T>(path, { decoder });
}
