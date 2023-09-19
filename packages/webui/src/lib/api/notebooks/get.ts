import type { NotebookConfig } from '$lib/models/notebook';
import { okAsync, fromPromise, err } from 'neverthrow';
import { getNBFS } from '../setup';
import { notebookConfigPath } from '../utils';
import { error } from '@sveltejs/kit';
import { asString } from '@jotx/fs';

export async function getNotebook(name: string) {
	const [nbfs] = getNBFS();
	const data = await fromPromise(nbfs.readFile(notebookConfigPath(name)), (err) =>
		createError(err as Error)
	);
	if (data.isErr()) return err(data.error);

	return okAsync(JSON.parse(asString(data.value)) as NotebookConfig);
}

function createError(err: Error) {
	if (err.toString().indexOf('ENOENT') > -1) {
		return error(404, err);
	} else {
		return error(500, err);
	}
}
