<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '../ui/button/button.svelte';
	import { IconGitHub, IconThumbUp, IconLeft } from '../icons';
	import Github from './Github.svelte';
	import type { GitPlatformType } from '$lib/models/git-platform';
	import Local from './Local.svelte';

	export let hideNotebooks = false;
	export let initialProvider: GitPlatformType | undefined;

	interface Provider {
		id: GitPlatformType;
		title: string;
		icon: ComponentType;
		setup: ComponentType;
	}

	const providers: Provider[] = [
		{
			id: 'github',
			title: 'Github',
			icon: IconGitHub,
			setup: Github
		},
		{
			id: 'unknown',
			title: 'Local',
			icon: IconGitHub,
			setup: Local
		}
	];

	let selected: Provider | undefined = initialProvider
		? providers.filter((p) => p.id === initialProvider)[0]
		: undefined;
	// let selected: Provider | undefined;
</script>

<div class="sm:min-w-[80%] sm:min-h-[50%] grid grid-cols-1 lg:grid-cols-4 gap-0 p-0 border">
	{#if !hideNotebooks}<div class="bg-gray-100 p-4">Notebooks</div>{/if}
	<div class={`bg-gray-50 ${hideNotebooks ? 'col-span-4' : 'col-span-3'}`}>
		<div class="p-6">
			{#if !selected}
				<div in:fade>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Add a new notebook by choosing a provider, where your noes will be stored.
					</p>
					<ul class="my-4 space-y-3">
						{#each providers as provider}
							<li>
								<div
									class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
								>
									<svelte:component this={provider.icon} class="w-6 h-6" />
									<div class="flex-1">
										<span class="ml-3 whitespace-nowrap">{provider.title}</span>
										{#if provider.id === 'github'}
											<span
												class="inline-flex items-center justify-center px-2 py-0.5 ml-2 text-xxs font-medium text-gray-600 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
												><IconThumbUp /></span
											>
										{/if}
									</div>
									<Button on:click={() => (selected = provider)}>Create</Button>
									<!-- <span
								class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
								>Recommended</span
							> -->
									<!-- <span
								class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
								>Recommended</span
							> -->
								</div>
							</li>
						{/each}
					</ul>
					<div>
						<a
							href="/"
							class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
						>
							<svg
								class="w-3 h-3 mr-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							Help me choose the right provider</a
						>
					</div>
				</div>
			{:else}
				<div in:fade>
					<Button
						on:click={() => (selected = undefined)}
						variant="link"
						class="text-sm font-normal text-gray-500 dark:text-gray-400"
					>
						<IconLeft class="w-5 h-5 mr-1" />
						Back</Button
					>
					<svelte:component this={selected.setup} />
				</div>
			{/if}
		</div>
	</div>
</div>
