<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconMoon, IconSun } from '$lib/components/icons';
	import { resolvedTheme, theme } from '$lib/theme';

	let clazz = '';
	export { clazz as class };
</script>

<Button
	class={clazz}
	variant="ghost"
	size="icon"
	on:click={(event) => {
		event.preventDefault();
		if ($resolvedTheme === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	}}
>
	{#if $resolvedTheme === 'dark'}
		<IconMoon class="transition-all" />
	{:else}
		<IconSun class="transition-all" />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
