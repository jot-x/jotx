import { Doc } from './doc';

/**
 * Note's heading details.
 *
 * When note is written in Markdown, this corresponds to the Frontmatter section.
 */
export interface NoteHeader {
  /**
   * Classifies notes by primitive strings.
   */
  tags: string[];
  /**
   * The title of the note
   *
   * If not defined in frontmatter, when notes stored in files, this can be the file name.
   */
  title?: string;
}

/**
 * A note is a brief written record of information, thoughts, ideas, or reminders.
 * Notes are typically used to capture and preserve important or noteworthy information for future reference.
 * They can serve various purposes, both personal and professional.
 */
export interface Note extends Doc {
  header?: NoteHeader;
  content: string;
}
