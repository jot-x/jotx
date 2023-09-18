export function decodeJWT<T>(token: string) {
	const parts = token.split('.');
	if (parts.length !== 3) {
		throw new Error('Invalid JWT format');
	}

	const [header, payload, signature] = parts;

	const decodedHeader = JSON.parse(atob(header));
	const decodedPayload = JSON.parse(atob(payload));

	return {
		header: decodedHeader,
		payload: decodedPayload as T,
		signature
	};
}

const FAKE_SECRET_KEY = 'TSYCFHa8RP0KOlx6F2r6xw7F3KDzjlp3';
export function encodeJWT(payload: unknown) {
	// Encode the payload to base64
	const base64Header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
	const base64Payload = btoa(JSON.stringify(payload));

	// Create the signature
	const signature = btoa(
		new TextEncoder().encode(base64Header + '.' + base64Payload + FAKE_SECRET_KEY).toString()
	);

	// Combine the encoded parts into a JWT
	const token = base64Header + '.' + base64Payload + '.' + signature;
	return token;
}
