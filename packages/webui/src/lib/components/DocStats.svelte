<script lang="ts">
	import type { FrontmatterDoc } from '@jotx/api/src/models/fmdoc';

	export let doc: FrontmatterDoc;

	function countWords(text: string): number {
		if (!text) return 0;
		const words = text.split(/\s+/);
		return words.length;
	}
</script>

<div class="fixed bottom-1 right-0 bg-secondary px-2 border rounded text-xs space-x-4">
	<span>{countWords(doc.content)} words</span>
	<span>{doc.content?.length} chars</span>
</div>
