import { DocStore } from '@jotx/core';
import { FileSystemDocStore, PromiseFS } from '@jotx/fs';
import { memfs } from 'memfs';
import { beforeEach, describe, expect, test } from 'vitest';
import { FrontmatterDoc } from '../../models/fmdoc';
import { writeDoc } from './write';
import { readDoc } from './read';

export function createNote(path: string, content: string): FrontmatterDoc {
  return {
    content,
    meta: {
      path,
      created: now,
      updated: now
    }
  };
}

const now = new Date();
const doc1 = createNote('/hello.md', 'hello');

describe('create doc', () => {
  let store: DocStore;
  let fs: PromiseFS;
  beforeEach(() => {
    // @ts-ignore
    fs = memfs().fs.promises;
    store = new FileSystemDocStore(fs);
  });

  test('read : no subdir', async () => {
    await writeDoc(store, { path: '/hello.md', doc: doc1 });
    const doc = await readDoc<FrontmatterDoc>(store, { path: '/hello.md' });
    expect(doc.meta.path).toEqual('/hello.md');
    expect(doc.content).toEqual('hello');
  });

  test('read : subdir', async () => {
    await writeDoc(store, { path: '/foo/bar/hello.md', doc: doc1 });
    const doc = await readDoc<FrontmatterDoc>(store, { path: '/foo/bar/hello.md' });
    expect(doc.meta.path).toEqual('/foo/bar/hello.md');
    expect(doc.content).toEqual('hello');
  });
});
