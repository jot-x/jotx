<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { userStore } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	export let data: PageData;

	onMount(() => {
		if ($page.data.idToken && $userStore?.id !== $page.data.idToken.sub) {
			const tok = $page.data.idToken;
			$userStore = {
				id: tok.sub
			};
		}

		if ($page.url.pathname === '/' && !data.notebooks.length) {
			goto('/setup');
		}
	});
</script>

<svelte:head>
	<title>JotX Web UI</title>
</svelte:head>

<div>
	<slot />
</div>
