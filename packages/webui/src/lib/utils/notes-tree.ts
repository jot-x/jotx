export interface TreeNode {
	label: string;
	path: string;
	children?: TreeNode[];
}

export function buildTree(filePaths: string[]): TreeNode {
	const root: TreeNode[] = [];

	for (const filePath of filePaths) {
		const pathSegments = filePath.split('/').filter(Boolean); // Split the path and remove empty segments

		let currentNode: TreeNode[] = root;
		let currentPath = '';

		for (const segment of pathSegments) {
			currentPath += `/${segment}`;
			const existingNode = currentNode.find((node) => node.path === segment);

			if (existingNode) {
				currentNode = existingNode.children as TreeNode[]; // Type assertion
			} else {
				const newNode: TreeNode = {
					label: segment.split('.').splice(0, 1).join('.'),
					path: currentPath,
					children: []
				};
				currentNode.push(newNode);
				currentNode = newNode.children as TreeNode[]; // Type assertion
			}
		}
	}

	return root[0];
}
