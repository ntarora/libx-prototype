/*----------  Created by Neel Arora for the Libx Project  ----------*/
/*
	Prototype design for LibApps replacement using promises and webpack
	to build.
	By using a series of promise generators and consumers we can build an
	asynchronas way to add content to a page.

	Loader.js loads all new modules
*/
import amazon from './Amazon';
import walker from './walker';

let apps = [amazon]
let utils = [walker]

libx.events.addListener("EditionConfigurationLoaded", {
    onEditionConfigurationLoaded: function () {
        load(apps, utils)
    }
});


function load(apps, utils){

	for(let app of apps)
	{
		if(app.matchPattern)
		{
			walker.registerPattern({regex: app.regex, nodeList : app.nodeList}).then(function(){
				console.log(app.name + ' registered pattern')
			}).catch(function(){
				console.log(app.name + 'failed to register pattern')
			})
		}
	}
	walker.walkTree().then(function(nodeList){
		//would be a for loop of 'apps'
		amazon.fires(nodeList)
	})
	.catch(function(err){
		console.log(err)
	})
}

///chunking a yeild with a promise that sleeps

//Look at yeilding chunking in ex5 in cloud user test promise.coroutine
//write it so the apps only process ONE node at a time, with every x node we sleep
//split the text node into matches {true | false | true \ false \ false} manipulate the node where matches are
//what do we tell the tree walker

//proccessing on the node assumes that it is attatched to the dom upon match; Assume this
//perform with processing on node attached
// what can we do with a detatched node

//API for walking the tree: Regular expression finds a match, split the node, split node goes into the DOM, then
// pass them to the proccessers, export methods for methods that needed for after proccessing.