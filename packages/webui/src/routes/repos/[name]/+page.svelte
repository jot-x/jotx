<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { newNote } from '$lib/api/utils';
	import type { Note } from '$lib/models/note';
	import { docLink } from '$lib/utils/doc';
	import type { PageData } from './$types';
	import NotSelectedMenu from './NotSelectedMenu.svelte';

	export let data: PageData;
	$: repo = data.repo;

	async function onCreateNote() {
		const { getDocStore } = await import('$lib/api/setup');
		const { writeDoc } = await import('@jotx/api');
		const path = '/' + getNewFileName(data.docs);
		const doc = newNote({ path, content: '' });
		const note = await writeDoc<Note>(getDocStore(repo.name), { path, doc });
		await invalidate('notes:load');
		goto(`${docLink(data.repo.name, note)}?mode=new`);
	}

	function getNewFileName(objects: { meta: { path: string } }[]): string {
		// Extract all "Untitled" names and store them in an array
		const untitledNames: string[] = objects
			.map((obj) => obj.meta.path)
			.filter((path) => path.startsWith('/Untitled'));

		// Find the highest numbered "Untitled" name
		let maxNumber = 0;
		untitledNames.forEach((path) => {
			const match = path.match(/^\/Untitled_(\d+).md$/);
			if (match) {
				const number = parseInt(match[1]);
				if (!isNaN(number) && number > maxNumber) {
					maxNumber = number;
				}
			}
		});

		// Return the next available name
		return `Untitled_${maxNumber + 1}.md`;
	}
</script>

<NotSelectedMenu on:new={onCreateNote} />
