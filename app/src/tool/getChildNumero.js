const getChildNumero = function(node, callback) {
	let _parent = node.parentNode;

	for (let i = 0; i < _parent.children.length; i++) {
		if (_parent.children[i] === node) {
			callback(i + 1, node);
			break;
		}
	}
};

export default getChildNumero;
