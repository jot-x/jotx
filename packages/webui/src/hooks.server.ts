import { COOKIE_SESSION_KEY } from '$lib/auth/constants';
import { auth } from '$lib/auth/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import debug from 'debug';
const log = debug('app:hooks.server');

const authHandler: Handle = async ({ event, resolve }) => {
	// Grab the token from the cookies
	const cookieToken = event.cookies.get(COOKIE_SESSION_KEY) as string;
	const bearerToken = event.request.headers.get('Authorization')?.split(' ')[1];
	const token = cookieToken ?? bearerToken;

	if (token) {
		const resp = await auth.validateSession({ token });

		if (resp.isOk()) {
			event.locals.idToken = resp.value.decoded_id_token;
		} else {
			console.error('Error validating session:', resp.error);
		}
	} else {
		log('anonymous login');
		const resp = await auth.anonymousSignin({ cookies: event.cookies });
		if (resp.isOk()) {
			event.locals.idToken = resp.value.decoded_id_token;
		} else {
			console.error('Error validating session:', resp.error);
		}
	}

	return resolve(event);
};

export const handle = sequence(authHandler);
