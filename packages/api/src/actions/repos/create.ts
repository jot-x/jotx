import { PromiseFS } from '@jotx/fs';
import { GitVersioning } from '@jotx/git';
import { z } from 'zod';
import { REPO_INTERNAL_FOLDER_NAME } from '../../constants';
import { RepoConfig } from '../../models/repo';
import { name } from '../../schema/doc';
import { repoConfigPath } from '../../utils/repo';

export const Schema = z.object({
  name
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
