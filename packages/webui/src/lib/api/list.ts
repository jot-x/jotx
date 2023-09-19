import type { NotebookConfig } from '$lib/models/notebook';
import { getNBFS } from './setup';
import { NOTEBOOK_PATH_PREFIX, contentToString, notebookConfigPath } from './utils';

export async function listNotebooks(): Promise<NotebookConfig[]> {
	const [nbfs] = await getNBFS();
	const dirs = await nbfs.readdir(NOTEBOOK_PATH_PREFIX);
	const paths = dirs.map((d) => notebookConfigPath(d));
	const result = await Promise.all(paths.map((p) => nbfs.readFile(p)));
	const nbs = result.map((uint8Arr) => JSON.parse(contentToString(uint8Arr)));

	return nbs;
}
