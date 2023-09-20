import { CONFIG_FILE_NAME, REPO_INTERNAL_FOLDER_NAME } from '../constants';

export function repoConfigPath() {
  return `/${REPO_INTERNAL_FOLDER_NAME}/${CONFIG_FILE_NAME}`;
}
