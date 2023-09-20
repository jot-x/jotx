import type { LayoutLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	const { listRepos } = await import('$lib/api/list');
	const repos = await listRepos();
	return { repos };
}) satisfies LayoutLoad;
