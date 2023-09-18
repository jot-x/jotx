import type { Cookies } from '@sveltejs/kit';
import debug from 'debug';
import { customAlphabet } from 'nanoid';
import { ResultAsync, err, errAsync, ok, okAsync } from 'neverthrow';
import { COOKIE_SESSION_KEY } from './constants';
import { decodeJWT, encodeJWT } from './jwt';

export const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	7
);

const log = debug('app:lib:auth:cookie');
const oneDay = 60 * 60 * 24;
// 10 years as we don't the user to loose its date
const expiresInSeconds = oneDay * 365 * 10;

export const auth = {
	async validateSession({ token }: { token: string }) {
		if (!token) return err(new Error('no token provided'));

		const resp = await introspect(token);
		if (resp.isErr()) return err(resp.error);
		if (!resp.value.sub) return err(new Error('cannot extract user from token introspection'));
		log('[login] user:', resp.value.sub);

		// in general we could fetch the entire user from the provider here but atm we store user locally so it'll be loaded in client side
		return ok({ decoded_id_token: resp.value, token });
	},
	async createSession({ token, cookies }: { token: string; cookies: Cookies }) {
		debug('creating user session');
		const resp = await introspect(token);
		if (resp.isErr()) return err(resp.error);

		const cookie = await createSessionCookie(token, { expiresIn: expiresInSeconds });
		const options = { maxAge: expiresInSeconds, httpOnly: true, secure: true, path: '/' };
		cookies.set(COOKIE_SESSION_KEY, cookie, options);
		return okAsync({});
	},
	async anonymousSignin({ cookies }: { cookies: Cookies }) {
		log('anonyomus login');
		const authTimeMillis = Date.now(); // Current time in milliseconds
		const authTimeSeconds = Math.floor(authTimeMillis / 1000); // Convert to seconds

		const idtoken: IDToken = {
			sub: nanoid(),
			auth_time: authTimeSeconds,
			exp: authTimeSeconds + expiresInSeconds
		};

		// fake token, in reality that would be a token (e.g., "oauth2 token") received during auth provider login / signup
		const token = encodeJWT(idtoken);
		const resp = await this.createSession({ token, cookies });
		if (resp.isErr()) return err(resp.error);
		console.log(resp.value);
		return okAsync({ decoded_id_token: idtoken, token });
	}
};

export interface IDToken {
	sub: string;
	auth_time: number;
	exp: number;
}

function introspect(token: string): ResultAsync<IDToken, Error> {
	// TODO introspect token in the auth provider

	const decodedToken = decodeJWT<IDToken>(token);
	if (decodedToken.payload.exp - new Date().getTime() / 1000 <= 0)
		return errAsync(new Error('Recent sign in required!'));
	// for the time being we return a decoded IDToken stored in a cookie
	return okAsync(decodedToken.payload);
}

/**
 * TODO
 * Verifies session cookie.
 * returns a promise with the cookie claims or rejects the promise if the cookie couldn't be verified.
 *
 * @param idToken
 * @param opts
 * @returns
 */
function createSessionCookie(
	idToken: string,
	opts?: { expiresIn?: number; checkDisabled?: boolean }
) {
	return idToken;
}
