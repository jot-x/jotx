export async function listRepos() {
	const dbs = await indexedDB.databases();
	const dirs = dbs
		.filter((d) => d.name !== undefined)
		.filter((d) => d.name?.startsWith('jotx_'))
		.map((d) => d.name?.replace('jotx_', ''));

	return dirs || [];
}
