<script lang="ts">
	import '../app.postcss';
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
