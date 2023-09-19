import { goto } from '$app/navigation';
import type { PageLoad } from './$types';
export const ssr = false;

export const load = (async ({ params }) => {
	const { name } = params;
	const { getNotebook } = await import('$lib/api');
	const notebook = await getNotebook(name);
	if (notebook.isErr()) {
		if (notebook.error.status === 404) {
			return goto('/');
		}

		throw notebook.error;
	}
	return {
		notebook: notebook.value
	};
}) satisfies PageLoad;
