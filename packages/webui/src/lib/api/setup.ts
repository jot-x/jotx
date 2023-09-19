import { docToMd, mdToDoc } from '$lib/utils/md';
import FS, { PromisifiedFS } from '@isomorphic-git/lightning-fs';
import type { DocStore, Note } from '@jotx/core';
import { FileSystemDocStore, asString } from '@jotx/fs';
const nbfs = new FS('testfs').promises;
nbfs.mkdir('/notebooks').catch(() => {});

const encoder: (doc: Note) => string = (doc) => {
	return docToMd(doc);
};

const decoder: (content: Uint8Array, path: string) => Note = (content, path) => {
	const str = asString(content);
	const note = mdToDoc(str, path);
	note.meta.path = path;
	return note;
};

const docsStore = new FileSystemDocStore(nbfs, encoder, decoder);

export function getNBFS(): [PromisifiedFS, DocStore] {
	return [nbfs, docsStore];
}
