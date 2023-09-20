<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FilesTree from '$lib/components/FilesTree.svelte';
	import type { Note } from '$lib/models/note';
	import { capitalize } from '$lib/utils/string';
	import type { PageData } from './$types';
	import DesktopSidebar from './DesktopSidebar.svelte';
	import MobileTopNav from './MobileTopNav.svelte';
	export let data: PageData;

	// TODO is there a better way than doing this?
	$: selectedPath = $page.url.pathname.replace('/repos/personal', '');

	function onFileClick(e: CustomEvent<any>): void {
		const { path } = e.detail;
		const ns = data.docs.filter((n: Note) => n.meta.path === path);
		if (ns.length !== 1) {
			// TODO show error
			console.error('cannot find note');
		}
		goto(`/repos/personal/${encodeURIComponent(ns[0].meta.path)}`);
	}
</script>

<div>
	<DesktopSidebar />
	<MobileTopNav />
	<main class="lg:pl-20">
		<div class="xl:pl-96">
			<slot />
		</div>
	</main>
	<!-- tree column (hidden on smaller screens) -->
	<aside
		class="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
	>
		<h2 class="font-semibold">
			{data.repo.title ? data.repo.title : capitalize(data.repo.name)} Notebook
		</h2>
		<div class="py-4">
			{#if data.tree}
				<FilesTree tree={data.tree} on:click={onFileClick} {selectedPath} />
			{/if}
		</div>
	</aside>
</div>
