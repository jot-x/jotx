export interface TreeNode {
	label: string;
	children?: TreeNode[];
}

export function buildTree(filePaths: string[]): TreeNode {
	const root: TreeNode[] = [];

	for (const filePath of filePaths) {
		const pathSegments = filePath.split('/').filter(Boolean); // Split the path and remove empty segments

		let currentNode: TreeNode[] = root;

		for (const segment of pathSegments) {
			const existingNode = currentNode.find((node) => node.label === segment);

			if (existingNode) {
				currentNode = existingNode.children as TreeNode[]; // Type assertion
			} else {
				const newNode: TreeNode = { label: segment, children: [] };
				currentNode.push(newNode);
				currentNode = newNode.children as TreeNode[]; // Type assertion
			}
		}
	}

	return root[0];
}
