import { Stats } from '@jotx/fs';
import { dump, load } from 'js-yaml';
import { FrontmatterDoc } from '../models/fmdoc';

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
  if (!mdContent) {
    console.warn('mdContent is undefined');
    return { content: undefined! };
  }
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

export function docToMd(note: FrontmatterDoc): string {
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

export function mdToDoc<T extends FrontmatterDoc>(md: string, path: string, stats: Stats): T {
  const { frontmatter, content } = extractFrontmatterAndContent(md);
  const doc = (load(frontmatter || '') as T) || {};
  doc.content = content;
  doc.meta = {
    path,
    created: new Date(stats.ctimeMs),
    updated: new Date(stats.mtimeMs)
  };

  return doc;
}
