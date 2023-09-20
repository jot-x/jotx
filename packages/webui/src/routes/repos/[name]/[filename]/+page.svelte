<script lang="ts">
	import _debounce from 'lodash.debounce';
	import type { PageData } from './$types';
	import Editor from '$lib/components/Editor.svelte';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	$: filename = data.filename;
	$: doc = data.doc;
	let saving = false;

	const handleInput = _debounce(async (e) => {
		saving = true;
		const { getDocStore } = await import('$lib/api/setup');
		const { writeDoc } = await import('@jotx/api');
		await writeDoc(getDocStore(data.repo_name), { path: filename, doc });
		saving = false;
	}, 2000);
</script>

<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
	{#if saving}
		<span out:fade class="fixed top-8 right-12 bg-secondary">Saving...</span>
	{/if}
	<Editor
		bind:value={doc.content}
		on:input={handleInput}
		autofocus
		class="h-[95vh] w-full outline-none"
	/>
</div>
