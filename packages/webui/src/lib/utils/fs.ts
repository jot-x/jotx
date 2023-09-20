export function basename(path: string, opts?: { stripFormat: boolean }): string {
	const parts = path.split('/');
	const part = parts[parts.length - 1];
	if (opts?.stripFormat && part.indexOf('.') > -1) {
		return part.split('.').splice(0, 1).join('.');
	}

	return part;
}
