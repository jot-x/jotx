import type { NotebookConfig } from '$lib/models/notebook';
import type { PromisifiedFS } from '@isomorphic-git/lightning-fs';

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
