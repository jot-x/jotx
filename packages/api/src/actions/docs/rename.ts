import { DocStore } from '@jotx/core';

interface Params {
  path: string;
  to: string;
}

/**
 * Rename an existing doc
 *
 * @param store
 * @param param1 params
 * @returns
 */
export async function renameDoc(store: DocStore, { path, to }: Params) {
  return store.rename(path, to);
}
