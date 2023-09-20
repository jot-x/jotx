import { DocStore } from '@jotx/core';
import { FileSystemDocStore, PromiseFS } from '@jotx/fs';
import { memfs } from 'memfs';
import { beforeEach, describe, expect, test } from 'vitest';
import { FrontmatterDoc } from '../../models/fmdoc';
import { writeDoc } from './write';
import { newNote } from './write.test';
import { listDocs } from './list';

describe('list', () => {
  let store: DocStore;
  let fs: PromiseFS;
  const fooDoc = newNote('/foo.md', 'foo');
  const barDoc = newNote('/bar.md', 'bar');
  beforeEach(() => {
    // @ts-ignore
    fs = memfs().fs.promises;
    store = new FileSystemDocStore(fs);
  });

  test('list', async () => {
    await writeDoc(store, { path: '/foo.md', doc: fooDoc });
    await writeDoc(store, { path: '/bar.md', doc: barDoc });
    const docs = await listDocs<FrontmatterDoc>(store);
    expect(docs.data).toHaveLength(2);
    expect(docs.data.map((d) => d.content).sort()).toEqual(['foo', 'bar'].sort());
  });
});
