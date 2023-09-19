import { goto } from '$app/navigation';
import type { NotebookConfig } from '$lib/models/notebook';
import type { PageLoad } from './$types';
export const ssr = false;

export const load = (async ({ params }) => {
	const { name } = params;
	const { getNotebook } = await import('$lib/api');
	const resp = await getNotebook(name);
	if (resp.isErr()) {
		if (resp.error.status === 404) {
			goto('/');
			// a hack to avoid marking notebook as optional
			return { notebook: {} as NotebookConfig };
		}

		throw resp.error;
	}
	const notebook = resp.value;
	return {
		notebook
	};
}) satisfies PageLoad;
