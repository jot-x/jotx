export type FileStatus =
  | 'modified'
  | 'ignored'
  | 'unmodified'
  | '*modified'
  | '*deleted'
  | '*added'
  | 'absent'
  | 'deleted'
  | 'added'
  | '*unmodified'
  | '*absent'
  | '*undeleted'
  | '*undeletemodified';

export type FileMatrixStatus = [string, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3];
