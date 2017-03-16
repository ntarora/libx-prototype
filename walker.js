/*----------  Created by Neel Arora for the Libx Project  ----------*/
/*
	walker.js uses tree walker to process nodes and return matching nodes
	pack to the intrested modules. 
*/
class Walker {

	constructor(){
		this.regexpatterns = [];
	}

	registerPattern(pattern){
		const length = this.regexpatterns.length;
		this.regexpatterns.push(pattern);

		return new Promise((fulfill, reject) => {
			if(length + 1 == this.regexpatterns.length)
				fulfill(true)
			else
				reject(false)
		})
	}

	/**
	 *
	 * initWalker: initializes a new treeWalker getting all 'text nodes'
	 * returns a promises with walker if successfully fulfilled
	 */
	
	initWalker(){
		let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {acceptNode : function(node){return NodeFilter.FILTER_ACCEPT}}, false)

		return new Promise((fulfill, reject) =>{
			if(walker)
				fulfill(walker);
			else
				reject('walker failed to init')
		})
	}

	/**
	
		TODO:
		- walk tree, filter for nodes with wanted regex pattern
		- return a list of pontential matched nodes back to the user.

		- find a way to process nodes on the fly, if a match is found
		give it back to the loader right away to distribute back to the 'app'
	
	 */
	
	walkTree()
	{
		let nodeList = []
		let self = this
		this.initWalker().then(function(walker){
			//walk the nodes match regex patterns in the node list
			while(walker.nextNode())
			{
				for(let pattern of self.regexpatterns)
				{
					// let regex = new RegExp(pattern)
					// let match = regex.exec(walker.currentNode.text.data)
					// if(match)
					// {
					// 	nodeList.push(currentNode);
					// }
					if(walker.currentNode.nodeValue)
					{
						console.log(walker.currentNode.nodeValue)
						let result = pattern(walker.currentNode.nodeValue)
						if(result)
							nodeList.push(walker.currentNode);
					}
					
				}
			}
			return new Promise((fulfill, reject) => {
				if(nodeList.length > 0)
					fulfill(nodeList)
				else
					reject('no matches found on page')
			})

		})
		.catch(function(err){
			console.log(err);
		})
	}

}

export default new Walker();