import { PromiseFS } from '@jotx/fs';
import { memfs } from 'memfs';
import { beforeEach, describe, expect, test } from 'vitest';
import { createRepository } from './create';
import { getConfig } from './get-config';

describe('get-config', () => {
  let fs: PromiseFS;
  beforeEach(() => {
    // @ts-ignore
    fs = memfs().fs.promises;
  });

  test('get : ok', async () => {
    await createRepository(fs, { name: 'foo' });
    const config = await getConfig(fs);
    expect(config).toEqual({ name: 'foo' });
  });

  test('git : not exists', async () => {
    expect(getConfig(fs)).rejects.toThrowError(/ENOENT/);
  });
});
