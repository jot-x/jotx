<script lang="ts">
	import { capitalize } from '$lib/utils/string';
	import type { PageData } from './$types';
	import DesktopSidebar from './DesktopSidebar.svelte';
	import MobileTopNav from './MobileTopNav.svelte';
	export let data: PageData;
</script>

<div>
	<DesktopSidebar />
	<MobileTopNav />
	<main class="lg:pl-20">
		<div class="xl:pl-96">
			<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
				<slot />
			</div>
		</div>
	</main>
	<!-- tree column (hidden on smaller screens) -->
	<aside
		class="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
	>
		<h2 class="font-semibold">
			{data.notebook.title ? data.notebook.title : capitalize(data.notebook.name)} Notebook
		</h2>
	</aside>
</div>
