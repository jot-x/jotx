import type { Doc, DocsStore } from '@jotx/core';
import FS, { PromisifiedFS } from '@isomorphic-git/lightning-fs';
import { LightningfsStore } from '@jotx/lightningfs';
const nbfs = new FS('testfs').promises;
nbfs.mkdir('/notebooks').catch(() => {});

const encoder: <T extends Doc>(doc: T) => string = (doc) => {
	const json = JSON.stringify(doc);
	return json;
};

const decoder: <T extends Doc>(str: string) => T = (str) => {
	return JSON.parse(str);
};

const docsStore = new LightningfsStore(nbfs, encoder, decoder);

export function getNBFS(): [PromisifiedFS, DocsStore] {
	return [nbfs, docsStore];
}
