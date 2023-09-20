<script context="module" lang="ts">
	// retain module scoped expansion state for each tree node
	const _expansionState: Record<string, boolean> = {
		/* treeNodeId: expanded <boolean> */
	};
</script>

<script lang="ts">
	import type { TreeNode } from '$lib/utils/notes-tree';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	//	import { slide } from 'svelte/transition'
	export let tree: TreeNode[];
	export let selectedPath: string;

	let expanded = _expansionState[tree[0].path] || false;
	const toggleExpansion = () => {
		expanded = _expansionState[tree[0].path] = !expanded;
	};
	$: arrowDown = expanded;
</script>

<ul>
	<!-- transition:slide -->
	{#each tree as tree}
		<li>
			{#if tree.children && tree.children.length > 0}
				<span on:click={toggleExpansion}>
					<span class="arrow" class:arrowDown>&#x25b6</span>
					{tree.label}
				</span>
				{#if expanded}
					{#each tree.children as child}
						<svelte:self tree={child} />
					{/each}
				{/if}
			{:else}
				<button
					class="hover:bg-secondary w-full text-left"
					class:bg-gray-50={selectedPath === tree.path}
					on:click={() => dispatch('click', { path: tree.path })}
				>
					<span class="cursor-pointer">
						<span class="no-arrow" />
						{tree.label}
					</span>
				</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem;
		user-select: none;
	}
	.no-arrow {
		padding-left: 1rem;
	}
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown {
		transform: rotate(90deg);
	}
</style>
