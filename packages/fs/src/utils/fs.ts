import { PromiseFS } from '../filesystem';

export async function mkdirp(fs: PromiseFS, directory: string) {
  try {
    await fs.stat(directory); // Check if the directory exists
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // The directory doesn't exist, create it recursively
      const parentDirectory = directory.substring(0, directory.lastIndexOf('/'));
      if (parentDirectory !== '') {
        await mkdirp(fs, parentDirectory); // Recursively ensure parent directories exist
      }
      await fs.mkdir(directory);
    } else {
      throw err;
    }
  }
}

export async function readdirRecursive(fs: PromiseFS, directory: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(directory);

  for (const entry of entries) {
    const entryPath = `${directory}/${entry}`.replace(/\/+/g, '/');
    const stat = await fs.stat(entryPath);

    if (stat.isDirectory()) {
      const subdirectoryFiles = await readdirRecursive(fs, entryPath);
      files.push(...subdirectoryFiles);
    } else {
      files.push(entryPath);
    }
  }

  return files;
}
