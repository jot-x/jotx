import { PromiseFS } from '@jotx/fs';
import { GitVersioning } from '@jotx/git';
import z from 'zod';
import { REPO_INTERNAL_FOLDER_NAME } from '../../constants';
import { RepoConfig } from '../../models/repo';
import { repoConfigPath } from '../../utils/repo';

export const Schema = z.object({
  name: z
    .string()
    .min(2, 'Name length should have at least 2 letters')
    .max(20, 'Name length should have maximum of 20 chars')
    .refine(
      (value: string) => /^[a-zA-Z0-9_]+$/.test(value),
      'Name should contain only alphabets and digits'
    )
});

interface Params {
  /**
   * the name of the repository, only alphanumeric and underscore are allowed
   */
  name: string;
  /**
   * true initializes .git versioning
   */
  initGit?: boolean;
}

/**
 * Create a new repository
 *
 * @param fs  filesystem API
 * @param param1 function parameters
 * @returns
 */
export async function createRepository(fs: PromiseFS, { name, initGit }: Params) {
  Schema.parse({ name });

  // create internal folder
  await fs.mkdir('/' + REPO_INTERNAL_FOLDER_NAME);

  // create config file
  const conf: RepoConfig = {
    name
  };

  fs.writeFile(repoConfigPath(), JSON.stringify(conf));

  if (initGit) {
    const git = new GitVersioning({ promises: fs }, '/');
    await git.init();
  }

  return conf;
}
