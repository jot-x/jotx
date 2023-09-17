import { Doc, Note } from '@jotx/core';
import { BFSRequire, configure } from 'browserfs';
import { beforeAll, describe, expect, test } from 'vitest';
import { BrowserFSStore } from './impl';

const encoder: <T extends Doc>(doc: T) => Buffer = (doc) => {
  const json = JSON.stringify(doc);
  return Buffer.from(json);
};

const decoder: <T extends Doc>(buffer: Buffer) => T = (buffer) => {
  const json = buffer.toString('utf-8'); // Assuming UTF-8 encoding
  return JSON.parse(json);
};

describe('crud', async () => {
  let store: BrowserFSStore;
  beforeAll(async () => {
    await configure({ fs: 'InMemory', options: {} }, (err: any) => {
      if (err) {
        throw err;
      }
    });
    store = new BrowserFSStore(BFSRequire('fs'), encoder, decoder);
  });

  test('read() - not found', async () => {
    expect(store.read('/foo.txt')).rejects.toThrowError(/ENOENT: No such file or directory./);
  });

  test('write()  in /', async () => {
    const now = new Date();
    const note: Note = {
      content: 'foo',
      meta: {
        created: now,
        updated: now
      }
    };
    expect(store.write('/foo.txt', note));
  });

  test('read() - found', async () => {
    const doc = await store.read<Note>('/foo.txt');
    expect(doc.content).toEqual('foo');
  });

  test('delete()', async () => {
    await store.delete('/foo.txt');
  });

  test('delete() - not found', async () => {
    expect(store.delete('/foo.txt')).rejects.toThrowError(/ENOENT: No such file or directory/);
  });

  test('read() - not found', async () => {
    expect(store.read('/foo.txt')).rejects.toThrowError(/ENOENT: No such file or directory./);
  });
});
