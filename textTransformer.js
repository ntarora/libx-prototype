/*----------  Created by Neel Arora for the Libx Project  ----------*/
/*
	textTransformer.js Transforms a node that is passed in from a module
	and returns a newly transformed node(s) to be manipulated and replaced
*/



	/**
		TODO:
		- given a text node split the text node into 3 parts
		- text - anchor - text 
	
	 */
	function tranformNodeAnchor({node, regexObj}){
		var temp = document.createElement('div')
		var anchorNode = {};
		temp.innerHTML = node.data.replace(regexObj, '<a href="www.google.com">$&</a>')
		while(temp.firstChild)
		{
			if(temp.firstChild.nodeType == 1)
				anchorNode = temp.firstChild
			node.parentNode.insertBefore(temp.firstChild, node)
		}

		//remove original node
		node.parentNode.removeChild(node);

		return new Promise((fulfill, reject) => {
			//fulfill(nodes)
			if(anchorNode)
				fulfill(anchorNode)
			else
				reject('error splitting node')
		})
	}

export default tranformNodeAnchor;