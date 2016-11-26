// todoLy

var ProjectsResource = require('./../resources/projects');
var ItemsResource = require('./../resources/items');
var UsersResource = require('./../resources/users');
var FiltersResource = require('./../resources/filters');

// var ProjectsHelper = require('./../helpers/projects');

var TodoLy = {
	resources: {
		items: ItemsResource,
		projects: ProjectsResource,
		users: UsersResource,
		filters: FiltersResource
	}
};

module.exports = TodoLy;