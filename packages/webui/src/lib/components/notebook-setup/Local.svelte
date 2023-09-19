<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { DocsStore } from '@jotx/core';
	import type { ButtonEventHandler } from 'bits-ui/dist/bits/button';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';

	let name: string = 'personal';
	let docsStore: DocsStore;
	onMount(async () => {});

	async function onCreate(e: ButtonEventHandler<MouseEvent>) {
		const { createNotebook } = await import('$lib/api/create');
		const resp = await createNotebook(name);
		if (resp.isErr()) {
			console.error(resp.error);
			// show error
			return;
		}

		goto(`/notebooks/${name}`);
	}
</script>

<div class="my-8">
	<div class="flex flex-col w-full max-w-sm gap-1.5 p-8">
		<Label for="email-2">Name</Label>
		<Input type="name" id="owner" placeholder="personal" bind:value={name} />
		<p class="text-sm text-muted-foreground">Your notebook name</p>
	</div>

	<div class="flex float-right">
		<Button class="content-end" on:click={onCreate}>Create</Button>
	</div>
</div>
