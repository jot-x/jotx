<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Editor from '$lib/components/Editor.svelte';
	import { docLink } from '$lib/utils/doc';
	import { basename } from '$lib/utils/fs';
	import { docSchemas, readDoc, renameDoc } from '@jotx/api';
	import _debounce from 'lodash.debounce';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	const nameSchema = docSchemas.name;

	export let data: PageData;
	let dirty = false;
	$: filename = data.filename;
	$: doc = data.doc;
	$: title = doc && basename(doc.meta.path, { stripFormat: true });
	let newTitle = '';
	let saving = false;
	let titleError: string | null;

	page.subscribe(() => {
		newTitle = basename(data.doc.meta.path, { stripFormat: true });
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
		const { getDocStore } = await import('$lib/api/setup');
		const { readDoc } = await import('@jotx/api');
		// validate
		const err = await nameSchema.safeParse(e.target.value);
		if (!err.success) {
			titleError = JSON.parse(err.error.message)[0].message;
			return;
		} else {
			titleError = null;
		}

		const path = doc.meta.path.replace(title, newTitle);
		try {
			const doc = await readDoc(getDocStore(data.repo_name), { path });
			titleError = 'Already exists';
			return;
		} catch (e: any) {
			if (e.code === 'ENOENT') {
				// good
			} else {
				titleError = e.message;
			}
		}
	};

	onMount(() => {
		window.addEventListener('beforeunload', (e) => {
			if (dirty) {
				e.preventDefault();
				e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
			}
		});
	});

	async function onInputBlur(
		event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }
	) {
		if (titleError) {
			newTitle = title;
			titleError = null;
			return;
		}

		const { getDocStore } = await import('$lib/api/setup');
		if (newTitle !== title) {
			saving = true;
			// TODO generalize path creation
			const path = doc.meta.path.replace(title, newTitle);
			await renameDoc(getDocStore(data.repo_name), { path: doc.meta.path, to: path });
			saving = false;
			dirty = false;
			doc.meta.path = path;
			await goto(docLink(data.repo_name, doc), { keepFocus: true });
			await invalidate('notes:load');
		}
	}
</script>

<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
	{#if saving}
		<span out:fade class="fixed top-8 right-12 bg-secondary">Saving...</span>
	{/if}
	<div class="relative">
		<input
			bind:value={newTitle}
			on:input={handleTitle}
			on:blur={onInputBlur}
			class="outline-none pb-5 font-semibold text-3xl"
		/>
		{#if titleError}
			<span
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				class="bg-destructive m-1 text-xs text-secondary absolute top-4 w-80 text-center rounded"
				>{titleError}</span
			>
		{/if}
	</div>
	<Editor
		bind:value={doc.content}
		on:input={handleContent}
		autofocus
		class="h-[95vh] w-full outline-none"
	/>
</div>
