<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ButtonEventHandler } from 'bits-ui/dist/bits/button';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { getFS } from '$lib/api/setup';
	import { goto } from '$app/navigation';

	let name: string = 'personal';
	onMount(async () => {});

	async function onCreate(e: ButtonEventHandler<MouseEvent>) {
		const { createRepository } = await import('@jotx/api');

		try {
			const resp = await createRepository(getFS(name), { name });
			goto(`/repos/${name}`);
		} catch (err) {
			// TODO show error
			console.error(err);
		}
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
