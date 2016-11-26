// Clean Environment
var frisby = require('frisby');
var Util = require('./../Util');
var URLs = require('./../../resources/URLs');

var CleanEnvironment = function(){
	frisby.globalSetup({
		request: {
			headers: {
				'Authorization': Util.getEncondedString()
			}
		}
	});
}

/**
* A function to delete non-system projects
*/
CleanEnvironment.prototype.cleanNonSystemProjects = function(){
	frisby
		.create('todo.ly Clean projects')
		.get(URLs.getUrl('get_projects'))
		.expectStatus(200)
		.afterJSON(function(projects){
			for (var i = 0; i < projects.length; i++) {
				if(projects[i].Icon == 0)
				{
					frisby
					.create('todo.ly Delete project by id')
					.delete(URLs.getUrl('delete_projectById').replace('[projectId]', projects[i].Id))
					.expectStatus(200)
					.toss()
				}
			};
		})
		.toss()
}

/**
* A function to delete items that belongs to non-system projects
*/
CleanEnvironment.prototype.cleanItems = function(){
	frisby
		.create('todo.ly Clean items')
		.get(URLs.getUrl('get_projects'))
		.expectStatus(200)
		.afterJSON(function(projects){
			for (var i = 0; i < projects.length; i++) {
				if(projects[i].Icon == 0)
				{
					frisby
					.create('todo.ly Get items by project id')
					.get(URLs.getUrl('get_itemsFromProjectById').replace('[projectId]', projects[i].Id))
					.expectStatus(200)
					.afterJSON(function(items){
						for (var i = 0; i < items.length; i++) {
							frisby
								.create('todo.ly Delete item by project Id')
								.delete(URLs.getUrl('delete_itemById').replace('[itemId]', items[i].Id))
								.expectStatus(200)
								.toss()
						};
					})
					.toss()
				}
			};
		})
		.toss()
}

module.exports = CleanEnvironment;