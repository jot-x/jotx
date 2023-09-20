import { goto } from '$app/navigation';
import { buildTree } from '$lib/utils/notes-tree';
import type { PageLoad } from './$types';
export const ssr = false;

export const load = (async ({ params }) => {
	const { getDocStoreByFS, getFS } = await import('$lib/api/setup');
	const { getConfig, listDocs } = await import('@jotx/api');
	const { name } = params;
	try {
		const fs = getFS(name);
		const repo = await getConfig(fs);
		const docsList = await listDocs(getDocStoreByFS(fs));

		const tree = buildTree(docsList.data.map((d) => d.meta.path));

		return {
			repo,
			docs: docsList.data,
			tree
		};
	} catch (err: any) {
		if (err.code === 'ENOENT') {
			goto('/');
		}
		throw err;
	}
}) satisfies PageLoad;
