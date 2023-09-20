import { PromiseFS, asString } from '@jotx/fs';
import { repoConfigPath } from '../../utils/repo';
import { RepoConfig } from '../../models/repo';

interface Params {
  /**
   * repository name
   */
  name: string;
}

export async function getConfig(fs: PromiseFS) {
  const data = await fs.readFile(repoConfigPath());
  return JSON.parse(asString(data)) as RepoConfig;
}
