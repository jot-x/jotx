<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { newNote } from '$lib/api/utils';
	import type { PageData } from './$types';
	import NotSelectedMenu from './NotSelectedMenu.svelte';

	export let data: PageData;
	$: repo = data.repo;

	async function onCreateNote() {
		const { getDocStore } = await import('$lib/api/setup');
		const { writeDoc } = await import('@jotx/api');
		const doc = newNote({ path: '/Untitled.md', content: '' });
		const note = await writeDoc(getDocStore(repo.name), { path: '/Untitled.md', doc });
		await invalidate('notes:load');
	}
</script>

<NotSelectedMenu on:new={onCreateNote} />
