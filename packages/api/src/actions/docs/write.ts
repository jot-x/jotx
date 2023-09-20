import { DocStore } from '@jotx/core';
import { FrontmatterDoc } from '../../models/fmdoc';
import { transcoders } from '../../transcoders';
import { getFileExtension } from '../../utils/files';

interface Params<T> {
  /**
   * document path, including name to create
   *
   * when stored in a file system, this is equivalent to file name, optionally prefixed with the sub folders (e.g., /recipes/pizza/napolitana.md)
   */
  path: string;

  /**
   * The doc to create
   */
  doc: Partial<T>;
}

/**
 * Writes a document
 *
 * This method upserts a doc (it creates a new or update an existing one)
 *
 * @param ds
 * @param param1
 * @returns
 */
export async function writeDoc<T extends FrontmatterDoc>(ds: DocStore, { path, doc }: Params<T>) {
  const ext = getFileExtension(path);
  if (!ext) {
    throw new Error('path must end with file extension');
  }
  const { encoder } = transcoders[ext];
  doc.meta.path = path;
  await ds.write(path, doc as T, { encoder });
  return doc;
}
