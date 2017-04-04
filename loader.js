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