<script lang="ts">
	import _debounce from 'lodash.debounce';
	import type { PageData } from './$types';
	import Editor from '$lib/components/Editor.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;
	let dirty = false;
	$: filename = data.filename;
	$: doc = data.doc;
	let saving = false;

	const handleInput = async (e) => {
		dirty = true;
		_debounce(async (e) => {
			saving = true;
			const { getDocStore } = await import('$lib/api/setup');
			const { writeDoc } = await import('@jotx/api');
			await writeDoc(getDocStore(data.repo_name), { path: filename, doc });
			saving = false;
			dirty = false;
		}, 2000)(e);
	};

	onMount(() => {
		window.addEventListener('beforeunload', (e) => {
			if (dirty) {
				e.preventDefault();
				e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
			}
		});
	});
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
