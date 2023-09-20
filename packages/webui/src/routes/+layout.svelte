<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/auth/store';
	import { Buffer } from 'buffer';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import type { PageData } from './$types';
	if (window) window.Buffer = Buffer;

	export let data: PageData;

	onMount(() => {
		if ($page.data.idToken && $userStore?.id !== $page.data.idToken.sub) {
			const tok = $page.data.idToken;
			$userStore = {
				id: tok.sub
			};
		}

		if ($page.url.pathname === '/' && data.repos?.length < 1) {
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
