import { Doc, DocStore } from '@jotx/core';
import { transcoders } from '../../transcoders';

const rootFilterFunc = (name: string): boolean => {
  return name.endsWith('.md');
};

interface Params {
  path?: string;
  recursive?: boolean;
  filter?: (name: string) => boolean;
  format?: 'md';
}

/**
 * List docs
 *
 * @param store
 * @param param1
 * @returns
 */
export async function listDocs<T extends Doc>(
  store: DocStore,
  { path = '/', recursive = true, filter, format = 'md' }: Params = {}
) {
  const filterFunc = filter || rootFilterFunc;

  const { decoder } = transcoders[format];

  return store.list<T>(path, {
    recursive,
    filter: filterFunc,
    decoder
  });
}
