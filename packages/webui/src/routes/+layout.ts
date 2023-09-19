import type { LayoutLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	const { listNotebooks } = await import('$lib/api');
	const notebooks = listNotebooks();
	return { notebooks };
}) satisfies LayoutLoad;
