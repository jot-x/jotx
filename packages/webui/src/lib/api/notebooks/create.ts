import type { NotebookConfig } from '$lib/models/notebook';
import { err, fromPromise, okAsync } from 'neverthrow';
import { getNBFS } from '../setup';
import { notebookConfigPath, notebookInternalPath, notebookPath } from '../utils';

export async function createNotebook(name: string) {
	const [nbfs] = await getNBFS();
	const path = notebookPath(name);

	// create the root notebook folder
	const nbResp = await fromPromise(nbfs.mkdir(path), (err) => new Error('mkdir error: ' + err));
	if (nbResp.isErr()) return err(nbResp.error);

	// create a configuration folder
	const intFoldResp = await fromPromise(
		nbfs.mkdir(notebookInternalPath(name)),
		(err) => new Error('mkdir error: ' + err)
	);
	if (intFoldResp.isErr()) return err(intFoldResp.error);

	// create the root folder
	const notebook: NotebookConfig = {
		name
	};
	// create the config file
	const configResp = await fromPromise(
		nbfs.writeFile(notebookConfigPath(name), JSON.stringify(notebook)),
		(err) => new Error('mkdir error: ' + err)
	);
	if (configResp.isErr()) return err(configResp.error);

	return okAsync(notebook);
}
