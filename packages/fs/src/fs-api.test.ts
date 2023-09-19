import { Doc } from '@jotx/core';
import { memfs } from 'memfs';
import { beforeAll, describe, expect, test } from 'vitest';
import { FileSystemDocStore } from './impl';

interface MyDoc extends Doc {
  content: string;
}

const encoder: <T extends Doc>(doc: T) => Buffer = (doc) => {
  const json = JSON.stringify(doc);
  return Buffer.from(json);
};

// Custom reviver function to convert date strings to Date objects
const customReviver = (key: string, value: any) => {
  if (typeof value === 'string') {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/;

    if (dateRegex.test(value)) {
      return new Date(value);
    }
  }
  return value;
};

const decoder: <T extends Doc>(buffer: Buffer) => T = (buffer) => {
  const json = buffer.toString('utf-8'); // Assuming UTF-8 encoding
  return JSON.parse(json, customReviver);
};

const now = new Date();
const meta = {
  created: now,
  updated: now
};

describe('crud - flat', async () => {
  let fs = memfs().fs;
  // @ts-ignore
  const store = new FileSystemDocStore(fs.promises, encoder, decoder);

  test('read() - not found', async () => {
    expect(store.read('/root/foo.json')).rejects.toThrowError(/ENOENT/);
  });

  test('write()  in /', async () => {
    const note: MyDoc = {
      content: 'foo',
      meta: { ...meta, path: '/root/foo.json' }
    };
    expect(await store.write('/root/foo.json', note));
  });

  test('read() - found', async () => {
    const doc = await store.read<MyDoc>('/root/foo.json');
    expect(doc.content).toEqual('foo');
  });

  test('delete()', async () => {
    await store.delete('/root/foo.json');
  });

  test('delete() - not found', async () => {
    expect(store.delete('/root/foo.json')).rejects.toThrowError(/ENOENT/);
  });

  test('read() - not found', async () => {
    expect(store.read('/root/foo.json')).rejects.toThrowError(/ENOENT/);
  });
});

describe('list', () => {
  let fs = memfs().fs;
  // @ts-ignore
  const store = new FileSystemDocStore(fs.promises, encoder, decoder);

  const file1 = {
    content: 'foo1',
    meta: { ...meta, path: '/foo/file1.json' }
  };

  const file2 = {
    content: 'foo2',
    meta: { ...meta, path: '/foo/file2.json' }
  };

  const file3 = {
    content: 'bar1',
    meta: { ...meta, path: '/bar/file3.json' }
  };

  beforeAll(async () => {
    await store.write<MyDoc>(file1.meta.path, file1);

    await store.write<MyDoc>(file2.meta.path, file2);

    await store.write<MyDoc>(file3.meta.path, file3);
  });

  test('list - root, non recursive', async () => {
    const result = await store.list('/');
    expect(result.data).toHaveLength(0);
  });

  test('list - single folder1, non recursive', async () => {
    const result = await store.list('/foo');
    expect(result.data).toHaveLength(2);
    const files1 = result.data.filter((d: MyDoc) => d.meta.path === '/foo/file1.json');
    expect(files1).toHaveLength(1);
    expect(files1[0]).toStrictEqual(file1);
  });

  test('list - single folder2, non recursive', async () => {
    const result = await store.list('/bar');
    expect(result.data).toHaveLength(1);
    const files1 = result.data.filter((d: MyDoc) => d.meta.path === '/bar/file3.json');
    expect(files1).toHaveLength(1);
    expect(files1[0]).toStrictEqual(file3);
  });

  test('list - root - recursively', async () => {
    const result = await store.list('/', { recursive: true });
    expect(result.data).toHaveLength(3);
    expect(result.data.map((f: MyDoc) => f.meta.path).sort()).toEqual(
      [file1.meta.path, file2.meta.path, file3.meta.path].sort()
    );
  });
});
