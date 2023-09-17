<script lang="ts">
	import { cn } from '$lib/ui-utils.ts';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<svg
	role="img"
	viewBox="0 0 256 256"
	xmlns="http://www.w3.org/2000/svg"
	fill="currentColor"
	class={cn('h-4 w-4', className)}
	{...$$restProps}
>
	<path
		d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z"
	/>
</svg>
