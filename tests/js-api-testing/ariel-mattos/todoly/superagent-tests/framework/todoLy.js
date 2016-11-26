// todoLy

var ProjectsResource = require('./resources/projects');
var ItemsResource = require('./resources/items');
var FiltersResource = require('./resources/filters');

var ProjectsHelper = require('./helpers/projects');
var FiltersHelper = require('./helpers/filters');

var TodoLy = {
	resources: {
		items: ItemsResource,
		projects: ProjectsResource,
		filters: FiltersResource
	},
	helpers: {
//		items: ItemsHelper,
		projects: ProjectsHelper,
		filters: FiltersHelper
	}
};

module.exports = TodoLy;