/*----------  Created by Neel Arora for the Libx Project  ----------*/
/*
	walker.js uses tree walker to process nodes and return matching nodes
	pack to the intrested modules. 
*/
class Walker {

	constructor(){
		this.apps = [];
        this.rejectScriptTextFilter = {
            acceptNode: function(node) {
                if (node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE' ) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        };

    }

    /**
	 *
     * @param patternObj {regex: function, nodeList: reference to nodeList}
     * @returns {Promise}
     */
	registerPattern(patternObj){
		const length = this.apps.length;
		this.apps.push(patternObj);

		return new Promise((fulfill, reject) => {
			if(length + 1 == this.apps.length)
				fulfill(true);
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
		let walker = document.createTreeWalker(window.document.documentElement, NodeFilter.SHOW_ALL, this.rejectScriptTextFilter, false)

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
		return this.initWalker().then(function(walker){
			let matches = 0;
			//walk the nodes match regex patterns in the node list
			while(walker.nextNode())
			{
				if(walker.currentNode.nodeType == 3)
				{
                    for(let app of self.apps)
                    {
                        // let regex = new RegExp(pattern)
                        // let match = regex.exec(walker.currentNode.text.data)
                        // if(match)
                        // {
                        // 	nodeList.push(currentNode);
                        // }
                        if(walker.currentNode.data)
                        {
                            let result = app.regex(walker.currentNode.data)
                            if(result)
                            {
                                app.nodeList.push(walker.currentNode);

                            }
                        }

                    }
				}

			}
			return new Promise((fulfill, reject) => {
				if(matches > 0)
					fulfill(true);
				else
					reject(false)
			})

		})
		.catch(function(err){
			console.log(err);
		})
	}

	generator(node)
	{
		return new Promise((fullfill, reject) =>{

		})
	}

}

export default new Walker();