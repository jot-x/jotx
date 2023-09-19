<script lang="ts">
	import { capitalize } from '$lib/utils/string';
	import type { Note } from '@jotx/core';
	import type { PageData } from './$types';
	import DesktopSidebar from './DesktopSidebar.svelte';
	import MobileTopNav from './MobileTopNav.svelte';
	import NotSelectedMenu from './NotSelectedMenu.svelte';
	import FilesTree from '$lib/components/FilesTree.svelte';
	import { onMount } from 'svelte';
	import { listNotes } from '$lib/api/notes/list';
	import { buildTree, type TreeNode } from '$lib/utils/notes-tree';
	import { newNote, NOTEBOOK_PATH_PREFIX } from '$lib/api/utils';
	import { createNote } from '$lib/api';
	export let data: PageData;

	let note: Note;
	let tree: TreeNode;

	function stripNotebookFromPath(path: string) {
		return path
			.split('/')
			.filter((p) => p !== data.notebook.name && p !== NOTEBOOK_PATH_PREFIX.slice(1))
			.join('/');
	}

	onMount(async () => {
		loadNotes();
	});

	async function loadNotes() {
		const resp = await listNotes(data.notebook.name);
		if (resp.isErr()) {
			return;
		}
		tree = buildTree(resp.value.data.map((n) => stripNotebookFromPath(n.meta.path)));
	}

	async function onCreateNote() {
		const note = newNote({ notebookName: data.notebook.name, name: 'Untitled' });
		const resp = await createNote(data.notebook.name, 'Untitled', note);
		if (resp.isErr()) {
			// TODO display error
			console.error(resp.error);
		}
		await loadNotes();
	}
</script>

<div>
	<DesktopSidebar />
	<MobileTopNav />
	<main class="lg:pl-20">
		<div class="xl:pl-96">
			{#if !note}
				<NotSelectedMenu on:new={onCreateNote} />
			{:else}
				<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">CONTENT</div>
			{/if}
		</div>
	</main>
	<!-- tree column (hidden on smaller screens) -->
	<aside
		class="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
	>
		<h2 class="font-semibold">
			{data.notebook.title ? data.notebook.title : capitalize(data.notebook.name)} Notebook
		</h2>
		<div class="py-4">
			{#if tree}
				<FilesTree {tree} />
			{/if}
		</div>
	</aside>
</div>
