<script lang="ts">
	import { onMount, tick } from 'svelte';

	export let value: string;
	export let autofocus = false;
	let clazz = '';
	export { clazz as class };

	let el: HTMLTextAreaElement;

	export async function focus() {
		await tick();
		el.focus();
	}

	onMount(async () => {
		if (autofocus) {
			focus();
		}
	});
</script>

<div>
	<textarea bind:value on:input class={clazz} bind:this={el} />
</div>
