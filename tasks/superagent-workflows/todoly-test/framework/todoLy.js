// todoLy

var ProjectsResource = require('./resources/projects');
var ItemsResource = require('./resources/items');
var UsersResource = require('./resources/users');

var ProjectsHelper = require('./helpers/projects');

var TodoLy = {
	resources: {
		items: ItemsResource,
		projects: ProjectsResource,
        users: UsersResource
	},
	helpers: {
		//items: ItemsHelper,
		projects: ProjectsHelper
	}
};

module.exports = TodoLy;