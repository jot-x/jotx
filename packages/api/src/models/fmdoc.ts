import { Doc } from '@jotx/core';

/**
 * Represents a document with a header, typically used to store structured metadata
 * and content within a single document.
 *
 * Header is a set of metadata or configuration attributes that provide context
 * and information about the document, such as its title, tags, author, etc...
 *
 * When storing in Markdown format, this is equivalent to the frontmatter section.
 **/
export interface Frontmatter {
  [key: string]: any;
}

export interface FrontmatterDoc extends Doc {
  header?: Frontmatter;
  content: string;
}
