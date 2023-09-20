<script lang="ts">
	import _debounce from 'lodash.debounce';
	import type { PageData } from './$types';
	import Editor from '$lib/components/Editor.svelte';
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { basename } from '$lib/utils/fs';
	import { page } from '$app/stores';
	import { renameDoc } from '@jotx/api';
	import { goto, invalidate } from '$app/navigation';
	import { docLink } from '$lib/utils/doc';

	export let data: PageData;
	let dirty = false;
	$: filename = data.filename;
	$: doc = data.doc;
	$: orgTitle = doc && basename(doc.meta.path, { stripFormat: true });
	let title = '';
	let saving = false;

	page.subscribe(() => {
		title = basename(data.doc.meta.path, { stripFormat: true });
	});

	const handleContent = async (e) => {
		dirty = true;
		_debounce(async (e) => {
			saving = true;
			const { getDocStore } = await import('$lib/api/setup');
			const { writeDoc } = await import('@jotx/api');
			await writeDoc(getDocStore(data.repo_name), { path: filename, doc });
			saving = false;
			dirty = false;
		}, 500)(e);
	};

	const handleTitle = async (e) => {
		dirty = true;
		_debounce(async (e) => {
			const { getDocStore } = await import('$lib/api/setup');
			if (title !== orgTitle) {
				saving = true;
				const newPath = doc.meta.path.replace(orgTitle, title);
				await renameDoc(getDocStore(data.repo_name), { path: doc.meta.path, to: newPath });
				saving = false;
				dirty = false;
				doc.meta.path = newPath;
				await goto(docLink(data.repo_name, doc), { keepFocus: true });
				await invalidate('notes:load');
			}
		}, 500)(e);
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
	<input
		bind:value={title}
		on:input={handleTitle}
		class="outline-none pb-5 font-semibold text-3xl"
	/>
	<Editor
		bind:value={doc.content}
		on:input={handleContent}
		autofocus
		class="h-[95vh] w-full outline-none"
	/>
</div>
