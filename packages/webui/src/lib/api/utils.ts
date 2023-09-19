import type { Note } from '@jotx/core';

export const NOTEBOOK_PATH_PREFIX = '/notebooks';
export const NOTEBOOK_INTERNAL_FOLDER = '.jotx';
export const NOTEBOOK_CONFIG_FILE_NAME = 'config.json';

export function notebookPath(notebook: string) {
	return `${NOTEBOOK_PATH_PREFIX}/${notebook}`;
}

export function notebookInternalPath(notebook: string) {
	return `${NOTEBOOK_PATH_PREFIX}/${notebook}/${NOTEBOOK_INTERNAL_FOLDER}`;
}

export function notebookConfigPath(notebook: string) {
	return `${notebookInternalPath(notebook)}/${NOTEBOOK_CONFIG_FILE_NAME}`;
}

export function contentToString(content: string | Uint8Array): string {
	if (typeof content === 'string') {
		return content;
	}

	return new TextDecoder().decode(content);
}

export function noteName(notebookName: string, noteName: string, opts?: { noSuffix: boolean }) {
	const name = `${notebookPath(notebookName)}/${noteName}`;
	if (opts && opts.noSuffix) {
		return name;
	}

	return name + '.md';
}

export function newNote({
	notebookName,
	name,
	content = '',
	tags
}: {
	notebookName: string;
	name: string;
	content?: string;
	tags?: string[];
}): Note {
	const path = noteName(notebookName, name);
	const now = new Date();
	const note: Note = {
		content,

		meta: {
			created: now,
			updated: now,
			path
		}
	};

	if (tags) {
		note.header = {
			tags
		};
	}

	return note;
}
