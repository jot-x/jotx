import type { Note } from '@jotx/core';
import { dump, load } from 'js-yaml';

/**
 *
 * Extract the frontmatter (header) and body (content) of a typpically markdown document.
 *
 * ```
 * ---
 * tags:
 *  - tag1
 *  - tag2
 * ---
 *
 * # my content
 * ```
 *
 * @param mdContent
 * @returns
 */
export function extractFrontmatterAndContent(mdContent: string): {
	frontmatter?: string;
	content: string;
} {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const matches = mdContent.match(frontmatterRegex);

	if (matches && matches.length === 3) {
		const frontmatter = matches[1].trim();
		const content = matches[2].trim();
		return { frontmatter, content };
	} else {
		return { content: mdContent };
	}
}

export function docToMd(note: Note): string {
	let md = '';
	if (note.header?.tags) {
		const frontMatter = {
			tags: note.header?.tags
		};
		md = '---\n';
		md += dump(frontMatter);
		md += '---\n\n';
	}

	md += note.content;

	return md;
}

export function mdToDoc(md: string, path: string): Note {
	const { frontmatter, content } = extractFrontmatterAndContent(md);
	const doc = (load(frontmatter || '') as Note) || {};
	doc.content = content;
	doc.meta = {
		path
	};

	return doc;
}
