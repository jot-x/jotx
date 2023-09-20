import type { Note } from '$lib/models/note';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { name, filename } = params;
	const { getDocStore } = await import('$lib/api/setup');
	const { readDoc } = await import('@jotx/api');
	try {
		const doc = await readDoc<Note>(getDocStore(name), { path: filename });
		return { filename: params.filename, repo_name: name, doc };
	} catch (e: any) {
		if (e.code === 'ENOENT') {
			// TODO what to do?
			console.warn('File does not exist');
		}
		throw e;
	}
}) satisfies PageLoad;
