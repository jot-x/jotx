import { User } from '@jotx/core/src/versioning/models/user';
import httpClient from 'isomorphic-git/http/node';
import { memfs } from 'memfs';
import { beforeAll, describe, expect, test } from 'vitest';
import { GitVersioning } from './isomorphic-git';

describe('init', () => {
  let docver: GitVersioning;
  let fs = memfs().fs;

  beforeAll(() => {
    docver = new GitVersioning(fs, '/repos');
  });

  //   const docver = new GitVersioning();
  test('init()', async () => {
    expect(fs.existsSync('/repos/.git')).toBeFalsy();
    await docver.init();
    expect(fs.existsSync('/repos/.git')).toBeTruthy();
  });
});

describe('add & status', () => {
  let fs = memfs().fs;
  let docver: GitVersioning;

  beforeAll(async () => {
    docver = new GitVersioning(fs, '/');
    await docver.init();
  });

  test('add()', async () => {
    expect(await docver.status({ filepath: 'foo.txt' })).toBe('absent');
    await fs.promises.writeFile('/foo.txt', 'hello');
    expect(await docver.status({ filepath: 'foo.txt' })).toBe('*added');
  });
});

describe('commit & log', () => {
  let fs = memfs().fs;
  let docver: GitVersioning;

  beforeAll(async () => {
    docver = new GitVersioning(fs, '/');
    await docver.init();
  });

  let message = 'initial commit';
  let author: User = {
    name: 'me',
    email: 'me@acme.io'
  };
  let hash: string;
  test('add & commit()', async () => {
    expect(docver.log()).rejects.toThrowError(/Could not find/);
    await fs.promises.writeFile('/foo.txt', 'hello');
    await docver.add({ filepaths: 'foo.txt' });
    const result = await docver.commit({ message, author });
    expect(result.hash).toBeDefined();
    hash = result.hash;
  });

  test('log', async () => {
    const result = await docver.log();
    expect(result).toHaveLength(1);
    expect(result[0].oid).toEqual(hash);
    expect(result[0].commit.message.trimEnd()).toEqual(message);
    expect(result[0].commit.author).toContain(author);
  });
});

describe('list', () => {
  let fs = memfs().fs;
  let docver: GitVersioning;

  beforeAll(async () => {
    docver = new GitVersioning(fs, '/');
    await docver.init();
  });

  test('list() - one file', async () => {
    expect(await docver.list()).toStrictEqual([]);
    await fs.promises.writeFile('/foo.txt', 'foo');
    await docver.add({ filepaths: 'foo.txt' });
    expect(await docver.list(), 'indexed files should be listed as well').toStrictEqual([
      'foo.txt'
    ]);
    await docver.commit({
      message: 'committed foo.txt',
      author: { name: 'me', email: 'me@acme.io' }
    });
    expect(await docver.list()).toStrictEqual(['foo.txt']);
  });

  test('list() - multi file', async () => {
    await fs.promises.mkdir('/other');
    await fs.promises.writeFile('/other/bar.txt', 'bar');
    await docver.add({ filepaths: 'other/bar.txt' });
    expect(await docver.list()).toStrictEqual(['foo.txt', 'other/bar.txt']);
  });
});

// remote
//

describe('clone', () => {
  let fs = memfs().fs;
  let docver: GitVersioning;

  beforeAll(async () => {
    docver = new GitVersioning(fs, '/', httpClient);
    await docver.init();
  });

  test('clone() : private', async () => {
    expect(docver.clone({ url: 'https://github.com/jot-x/notes' })).rejects.toThrowError(
      /401 Unauthorized/
    );
  });

  test('clone() : ok', async () => {
    await docver.clone({ url: 'https://github.com/jot-x/notes-itests', depth: 1 });
    expect((await docver.list()).length).toBeGreaterThan(0);
  });
});
