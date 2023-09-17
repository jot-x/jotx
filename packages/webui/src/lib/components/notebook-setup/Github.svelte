<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Button from '../ui/button/button.svelte';

	let repo: string = 'notes';
	let owner: string = 'asaf';
</script>

<div class="my-8">
	<div class="flex flex-col w-full max-w-sm gap-1.5 p-8">
		<Label for="email-2">Owner Name</Label>
		<Input type="username" id="owner" placeholder="<github username>" bind:value={owner} />
		<p class="text-sm text-muted-foreground">Enter your github user name.</p>
	</div>
	<div class="flex flex-col w-full max-w-sm gap-1.5 p-8">
		<Label for="email-2">Repository Name</Label>
		<Input type="string" id="repo" placeholder="notes" bind:value={repo} />
		<p class="text-sm text-muted-foreground">
			Enter your github repostory name where notes will be stored.
		</p>
	</div>
	<div class="flex float-right">
		<Button class="content-end">Connect</Button>
	</div>
</div>
