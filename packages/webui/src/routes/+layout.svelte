<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { userStore } from '$lib/auth/store';
	import { goto } from '$app/navigation';

	onMount(() => {
		if ($page.data.idToken && $userStore?.id !== $page.data.idToken.sub) {
			const tok = $page.data.idToken;
			$userStore = {
				id: tok.sub,
				notebooks: []
			};
		}

		if ($userStore) {
			if (!$userStore.notebooks.length) {
				goto('/setup');
			}
		}
	});
</script>

<svelte:head>
	<title>JotX Web UI</title>
</svelte:head>

<div>
	<main class="lg:pl-20">
		<div class="xl:pl-96">
			<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
				<slot />
			</div>
		</div>
	</main>
</div>
