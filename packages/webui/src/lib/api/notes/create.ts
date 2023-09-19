import type { Note } from '@jotx/core';
import { getNBFS } from '../setup';
import { noteName } from '../utils';
import { fromPromise } from 'neverthrow';

export async function createNote(notebookName: string, name: string, initialContent: Note) {
	const [, ds] = getNBFS();
	const filePath = noteName(notebookName, name);
	return fromPromise(ds.write(filePath, initialContent), (err) => new Error('Write error: ' + err));
}
