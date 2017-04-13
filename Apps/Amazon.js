/*----------  Created by Neel Arora for the Libx Project  ----------*/
/*
	Prototype Amazon module that uses walker.js to find title and insert a link
	amazon.js

	every module will have:
		- name: string
		- imports from other modules

		- MatchPattern: boolean
		- regex (MatchPatter == true): regex pattern, function to be passed
		- fires : called by loader to run main functionality of lib
*/
import stdNum from './stdnumsupport';
import anchorNode from './textTransformer';
import toolTip from './toolTip';

class Amazon {

	constructor(){
		this.Num = new stdNum()
		this.name = "Amazon ISBN Linker"
		this.matchPattern = true;
		this.regexObj = /((978[\--– ])?[0-9][0-9\--– ]{11}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/g;
		this.regex = this.Num.isISBN.bind(this.Num);
		this.nodeList = [];
	}
	
	
	fires (){
		var i = 0;
		for(let node in this.nodeList)
		{

			//nodeList[node] node with ISBN CHANGED
			let node = this.nodeList[node];
			let regexObj = this.regexObj
			anchorNode({node, regexObj}).then(function (node){
				let idString = `${new Date().valueOf() + (Math.floor(Math.random() * 100))}`
				node.setAttribute("id", idString)
				toolTip(idString)
			}).catch(function(err){
				console.log(err)
			})
		}

	};


	convertISBN()
	{

	}
};

export default new Amazon();