<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import FilesTree from '$lib/components/FilesTree.svelte';
	import type { Note } from '$lib/models/note';
	import { docLink } from '$lib/utils/doc';
	import { capitalize } from '$lib/utils/string';
	import type { PageData } from './$types';
	import DesktopSidebar from './DesktopSidebar.svelte';
	import MobileTopNav from './MobileTopNav.svelte';
	import { resolvedTheme } from '$lib/theme';
	export let data: PageData;

	if (browser) {
		resolvedTheme.subscribe((value) => {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(value);
		});
	}

	// TODO is there a better way than doing this?
	$: selectedPath = decodeURIComponent($page.url.pathname.replace(`/repos/${data.repo.name}/`, ''));

	function onFileClick(e: CustomEvent<any>): void {
		const { path } = e.detail;
		const ns = data.docs.filter((n: Note) => n.meta.path === path);
		if (ns.length !== 1) {
			// TODO show error
			console.error('cannot find note');
		}
		goto(docLink(data.repo.name, ns[0]), { keepFocus: true });
	}

	async function onDelete(e: CustomEvent<any>) {
		const { getDocStore } = await import('$lib/api/setup');
		const st = getDocStore(data.repo.name);
		const { path } = e.detail;
		await st.delete(path);
		await invalidate('notes:load');
		goto(`/repos/${data.repo.name}`);
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
		class="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-border px-4 py-6 sm:px-6 lg:px-8 xl:block"
	>
		<h2 class="font-semibold">
			{data.repo.title ? data.repo.title : capitalize(data.repo.name)} Notebook
		</h2>
		<div class="py-4">
			{#if data.tree && data.tree.length > 0}
				<FilesTree tree={data.tree} on:click={onFileClick} {selectedPath} on:delete={onDelete} />
			{/if}
		</div>
	</aside>
</div>
