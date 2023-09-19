import type { LayoutLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	const { listNotebooks } = await import('$lib/api');
	const notebooks = await listNotebooks();
	return { notebooks };
}) satisfies LayoutLoad;
