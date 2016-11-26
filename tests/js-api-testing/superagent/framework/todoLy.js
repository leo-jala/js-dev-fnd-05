// todoLy

var ProjectsResource = require('./resources/projects');
var ItemsResource = require('./resources/items');

var ProjectsHelper = require('./helpers/projects');

var TodoLy = {
	resources: {
		items: ItemsResource,
		projects: ProjectsResource
	},
	helpers: {
		//items: ItemsHelper,
		projects: ProjectsHelper
	}
};

module.exports = TodoLy;