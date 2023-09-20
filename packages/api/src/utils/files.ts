export function getFileExtension(filePath: string): string | null {
  const parts = filePath.split('.');
  if (parts.length > 1) {
    return parts.pop()!.toLowerCase();
  }
  return null;
}

export function removeFileExtension(filePath: string): string {
  const ext = getFileExtension(filePath);
  if (ext) {
    filePath.substring(0, filePath.length - ext.length + 1);
  }

  return filePath;
}
