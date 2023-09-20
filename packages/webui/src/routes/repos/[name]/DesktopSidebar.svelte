<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/ui-utils';
	import type { ComponentType } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import IconNotebook from '$lib/components/icons/IconNotebook.svelte';

	const navs: { name: string; href: string; icon: ComponentType }[] = [
		// { name: 'Dashboard', href: '#', icon: IconNotebook }
	];
</script>

<div
	class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-20 lg:overflow-y-auto lg:bg-secondary lg:pb-4"
>
	<div class="flex h-16 shrink-0 items-center justify-center">
		<!-- <IconLogo class="h-8 w-auto" /> -->
	</div>
	<nav class="mt-8 flex-1 flex flex-col">
		<ul role="list" class="flex flex-col items-center space-y-1 grow flex-1">
			{#each navs as nav}
				<li>
					<a
						href={nav.href}
						class={cn(
							'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold',
							$page.url.pathname.includes(nav.href)
								? 'bg-gray-800 text-white'
								: 'text-gray-400 hover:text-white hover:bg-gray-800'
						)}
					>
						<svelte:component this={nav.icon} class="h-6 w-6 shrink-0" aria-hidden="true" />
						<span class="sr-only">{nav.name}</span>
					</a>
				</li>
			{/each}
			<li>
				<!-- <CreateStoreDialog /> -->
			</li>
		</ul>
		<ul class="flex flex-col items-center space-y-1">
			<li>
				<ThemeToggle class="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold" />
			</li>
			<li />
		</ul>
	</nav>
</div>
