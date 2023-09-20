<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="h-screen w-full flex justify-center items-center">
	<div class="mx-auto max-w-lg text-center">
		<h2 class="text-base font-semibold leading-6 text-primary">No file is open</h2>
		<p class="mt-1 text-sm text-gray-500">Open or create a new note</p>
		<ul role="list" class="mt-6 divide-y divide-gray-200">
			<li>
				<div class="group relative flex items-start space-x-3 py-4 text-left">
					<div class="min-w-0 flex-1">
						<div class="text-sm font-medium text-gray-900">
							<Button variant="link" on:click={() => dispatch('new')}>Create a new note</Button>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="mt-6 flex">
			<a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
				Or open command menu
				<span aria-hidden="true"> &rarr;</span>
			</a>
		</div>
	</div>
</div>
