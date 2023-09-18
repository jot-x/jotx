import type { LayoutServerLoadEvent } from './$types';

export async function load(event: LayoutServerLoadEvent) {
	const idToken = event.locals?.idToken;
	if (!idToken) return { idToken: null };

	return { idToken };
}
