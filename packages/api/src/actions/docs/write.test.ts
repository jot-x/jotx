import { DocStore } from '@jotx/core';
import { FileSystemDocStore, PromiseFS } from '@jotx/fs';
import { memfs } from 'memfs';
import { beforeEach, describe, expect, test } from 'vitest';
import { FrontmatterDoc } from '../../models/fmdoc';
import { writeDoc } from './write';

export function newNote(path: string, content: string): FrontmatterDoc {
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
const doc1 = newNote('/hello.md', 'hello');

describe('create doc', () => {
  let store: DocStore;
  let fs: PromiseFS;
  beforeEach(() => {
    // @ts-ignore
    fs = memfs().fs.promises;
    store = new FileSystemDocStore(fs);
  });

  test('write : no subdir', async () => {
    writeDoc(store, { path: '/hello.md', doc: doc1 });
    expect(await fs.readdir('/')).toStrictEqual(['hello.md']);
  });

  test('write : subdirs', async () => {
    await writeDoc(store, { path: '/foo/bar/hello.md', doc: doc1 });
    expect(await fs.readdir('/foo/bar')).toStrictEqual(['hello.md']);
  });
});
