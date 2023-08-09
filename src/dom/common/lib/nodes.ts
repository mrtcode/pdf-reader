export function getAllTextNodes(root: Node): Text[] {
	let nodeIterator = root.ownerDocument!.createNodeIterator(root, NodeFilter.SHOW_TEXT);
	let nodes = [];
	let next = null;
	while ((next = nodeIterator.nextNode())) {
		nodes.push(next as Text);
	}
	return nodes;
}

export function getVisibleTextNodes(root: Node): Text[] {
	let range = root.ownerDocument!.createRange();
	return getAllTextNodes(root).filter((node) => {
		range.selectNodeContents(node);
		let rect = range.getBoundingClientRect();
		return rect.width && rect.height;
	});
}

export function isElement(node: Node): node is Element {
	return node.nodeType === Node.ELEMENT_NODE;
}

export function closestElement(node: Node): Element | null {
	let currentNode: Node | null = node;
	while (currentNode && !isElement(currentNode)) {
		currentNode = currentNode.parentNode;
	}
	return currentNode;
}
