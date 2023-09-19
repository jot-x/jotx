import { okAsync } from 'neverthrow';
import { getNBFS } from '../setup';
import { notebookPath } from '../utils';

const rootFilterFunc = (name: string): boolean => {
	return name.endsWith('.md');
};

export async function listNotes(
	notebookName: string,
	opts?: { rootFilter: (name: string) => boolean; header: true }
) {
	const rootFilter = opts?.rootFilter || rootFilterFunc;
	const [, ds] = getNBFS();
	const notes = await ds.list(notebookPath(notebookName), { recursive: true, filter: rootFilter });
	return okAsync(notes);
}

/*
async function getFiles(
	fs: PromisifiedFS,
	dir: string,
	opts?: { rootFilter: (name: string) => boolean }
) {
	let subdirs = await fs.readdir(dir);
	if (opts?.rootFilter) {
		subdirs = subdirs.filter(opts.rootFilter);
	}

	const files = await Promise.all(
		subdirs.map(async (subdir) => {
			const res = resolve(dir, subdir);
			return (await fs.stat(res)).isDirectory() ? getFiles(fs, res) : res;
		})
	);
	return files.reduce((a: string, f: string) => a.concat(f), []);
}

function resolve(dir: string, diren: string) {
	return dir + '/' + diren;
}
*/
