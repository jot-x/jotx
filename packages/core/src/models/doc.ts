/**
 * A minimal representation of a Document that can be stored, retrieved, modified, tracked for changes, etc.
 */
export interface Doc {
  /**
   * Bare minimal meta data information
   */
  meta: DocMeta;
}

/**
 * Document metadata.
 *
 * If document is stored in a filesystem then those values can be retreived from file's inode.
 *
 * Metadata properties should not be modified directly by the user.
 */
export interface DocMeta {
  /**
   * Creation timestamp
   */
  created: Date;
  /**
   * Last updated timestamp
   */
  updated: Date;
  /**
   * A full path of the document.
   */
  path: string;
}
