// Inserts a new node right after specified existing node
export const insertAfter = (newNode: Node, existingNode: Node) => {
    if (!existingNode.parentNode) return;
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};