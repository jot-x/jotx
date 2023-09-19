<script context="module" lang="ts">
	// retain module scoped expansion state for each tree node
	const _expansionState: Record<string, boolean> = {
		/* treeNodeId: expanded <boolean> */
	};
</script>

<script lang="ts">
	import type { TreeNode } from '$lib/utils/notes-tree';

	//	import { slide } from 'svelte/transition'
	export let tree: TreeNode;

	let expanded = _expansionState[tree.label] || false;
	const toggleExpansion = () => {
		expanded = _expansionState[tree.label] = !expanded;
	};
	$: arrowDown = expanded;
</script>

<ul>
	<!-- transition:slide -->
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
			<span>
				<span class="no-arrow" />
				{tree.label}
			</span>
		{/if}
	</li>
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
