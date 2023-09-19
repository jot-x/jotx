import { okAsync, fromPromise, err } from 'neverthrow';
import { getNBFS } from '../setup';
import { NOTEBOOK_PATH_PREFIX, contentToString, notebookConfigPath } from '../utils';

export async function listNotebooks() {
	const [nbfs] = await getNBFS();
	const dirs = await fromPromise(
		nbfs.readdir(NOTEBOOK_PATH_PREFIX),
		(err) => new Error('Read dir error: ' + err)
	);
	if (dirs.isErr()) return err(dirs.error);
	const paths = dirs.value.map((d) => notebookConfigPath(d));
	const result = await fromPromise(
		Promise.all(paths.map((p) => nbfs.readFile(p))),
		(err) => new Error('read files error: ' + err)
	);
	if (result.isErr()) return err(result.error);
	const nbs = result.value.map((uint8Arr) => JSON.parse(contentToString(uint8Arr)));

	return okAsync(nbs);
}
