<script lang="ts">
	import type * as Jotxe from '@jotx/editor';
	import jotxe from '@jotx/editor';
	import { createEventDispatcher, onMount } from 'svelte';

	type Events = {
		beforeUpdate: string;
		afterUpdate: string;
	};
	const dispatch = createEventDispatcher<Events>();

	type OptionsWithoutDoc = Omit<Jotxe.Options, 'doc'>;

	export let value: string | undefined = undefined;
	export let editor: Jotxe.Instance | undefined = undefined;
	export let options: OptionsWithoutDoc | undefined = undefined;

	let divRef: HTMLDivElement;

	export function focus() {
		editor?.focus();
	}

	onMount(() => {
		editor = jotxe(divRef, {
			doc: value,
			...options,
			hooks: {
				afterUpdate: (doc: string) => {
					value = doc;
					options?.hooks?.afterUpdate?.(doc);
					dispatch('afterUpdate', doc);
				},
				beforeUpdate: (doc: string) => {
					options?.hooks?.beforeUpdate?.(doc);
					dispatch('beforeUpdate', doc);
				}
			}
		});
	});

	// reactive configuration
	// if a parent component changes the `option` prop, the editor will be reconfigured
	$: {
		if (editor && options) {
			editor.reconfigure(options);
		}
	}

	// reactive doc
	// if a parent component changes the `value` prop, the editor will update the doc
	$: {
		if (editor && value && editor.getDoc() !== value) {
			editor.update(value);
		}
	}
</script>

<div bind:this={divRef} />
