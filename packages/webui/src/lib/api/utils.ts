import type { Note } from '$lib/models/note';

export function newNote({
	path,
	content = '',
	tags
}: {
	path: string;
	content?: string;
	tags?: string[];
}): Note {
	const now = new Date();
	const note: Note = {
		content,

		meta: {
			created: now,
			updated: now,
			path
		}
	};

	if (tags) {
		note.header = {
			tags
		};
	}

	return note;
}
