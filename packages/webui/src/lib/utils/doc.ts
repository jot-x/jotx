import type { Doc } from '@jotx/core';

export function docLink(repoName: string, doc: Doc) {
	return `/repos/${repoName}/${encodeURIComponent(doc.meta.path)}`;
}
