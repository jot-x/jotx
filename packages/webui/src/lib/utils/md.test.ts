import type { Note } from '@jotx/core';
import { expect, test } from 'vitest';
import { docToMd, mdToDoc } from './md';

const now = new Date();

const note: Note = {
	header: {
		tags: ['foo', 'bar'],
		title: 'hello'
	},
	content: '# hello',
	meta: {
		path: '/',
		created: now,
		updated: now
	}
};

const mdNote = `---\ntags:\n  - foo\n  - bar\n---\n\n# hello`;

test('docToMd', () => {
	const md = docToMd(note);
	expect(md).toEqual(mdNote);
});

test('docToMd - empty', () => {
	const md = docToMd({ content: '', meta: { path: '/', created: now, updated: now } });
	expect(md).toEqual('');
});

test('mdToDoc', () => {
	const note = mdToDoc(mdNote, '/foo.md');
	expect(note.header?.tags).toEqual(note.header?.tags);
	expect(note.content).toEqual(note.content);
});
