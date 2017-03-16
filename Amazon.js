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

class Amazon {

	constructor(){
		this.Num = new stdNum()
		this.name = "Amazon ISBN Linker"
		this.matchPattern = true;
		this.regex = this.Num.isISBN.bind(this.Num); 
	}
	
	
	fires (nodeList){
		for(node in nodeList)
		{
			console.log(node)
			//convertISBN(node);
		}
		
	};


	convertISBN()
	{

	}
};

export default new Amazon();