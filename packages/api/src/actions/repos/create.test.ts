import { describe, expect, test, beforeEach } from 'vitest';
import { createRepository } from './create';
import { memfs } from 'memfs';
import { PromiseFS } from '@jotx/fs';
import { CONFIG_FILE_NAME, REPO_INTERNAL_FOLDER_NAME } from '../../constants';

describe('create', () => {
  let fs: PromiseFS;
  beforeEach(() => {
    // @ts-ignore
    fs = memfs().fs.promises;
  });

  test('alphabet : ok, no git', async () => {
    await createRepository(fs, { name: 'foo' });
    expect(await fs.readdir('/')).toStrictEqual([REPO_INTERNAL_FOLDER_NAME]);
    expect(await fs.readdir(`/${REPO_INTERNAL_FOLDER_NAME}`)).toStrictEqual([CONFIG_FILE_NAME]);
  });

  test('alphabet : ok, with git', async () => {
    await createRepository(fs, { name: 'foo', initGit: true });
    expect((await fs.readdir('/')).sort()).toStrictEqual(
      [REPO_INTERNAL_FOLDER_NAME, '.git'].sort()
    );
    expect(await fs.readdir(`/${REPO_INTERNAL_FOLDER_NAME}`)).toStrictEqual([CONFIG_FILE_NAME]);
  });

  test('alpha with digits and underscore : ok', async () => {
    await createRepository(fs, { name: 'foo_123' });
  });

  test('space : fail', async () => {
    expect(createRepository(fs, { name: 'foo 123' })).rejects.toThrow();
  });
});
