// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IDToken } from '$lib/auth/auth';

// import type User from '$lib/models/user';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			idToken?: IDToken;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
