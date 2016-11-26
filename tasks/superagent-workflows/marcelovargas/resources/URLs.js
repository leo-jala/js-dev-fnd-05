var config = require('./../config/config');

/**
* A class to initialize Urls
*/
var endpoints = {
	post_user : 'user.json',
	get_user : 'user.json',
	delete_user : 'user/0.json',
	get_projects : 'projects.json',
	post_project : 'projects.json',
	get_projectById : 'projects/[projectId].json',
	put_projectById : 'projects/[projectId].json',
	delete_projectById : 'projects/[projectId].json',
	get_itemsFromProjectById : 'projects/[projectId]/Items.json',
	get_filters : 'filters.json',
	get_filterById : 'filters/[filterId].json',
	get_itemsFromFilterById : 'filters/[filterId]/items.json',
	get_doneItemsFromFilterById : 'filters/[filterId]/doneitems.json',
	get_items : 'items.json',
	post_item : 'items.json',
	get_itemById : 'items/[itemId].json',
	put_itemById : 'items/[itemId].json',
	delete_itemById : 'items/[itemId].json',
	get_rootItemByChildId : 'Items/[childId]/RootItem.json',
	get_doneRootItemByChildId : 'Items/[childId]/DoneRootItem.json',
	get_iconsById : 'icons/[iconId].json'
}

var URLs = {
	getUrl : function(url) {
		return config.getProperty('BASE_URL') + config.getProperty('API_VERSION') + endpoints[url];
	}
}

module.exports = URLs;