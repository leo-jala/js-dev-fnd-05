/**
* A class to initialize Urls
*/
var URLs = function(){
	this.post_user = 'https://todo.ly/api/user.json';
	this.get_user = 'https://todo.ly/api/user.json';
	this.delete_user = 'https://todo.ly/api/user/0.json';
	this.get_projects = "https://todo.ly/api/projects.json";
	this.post_project = "https://todo.ly/api/projects.json";
	this.get_projectById = "https://todo.ly/api/projects/[projectId].json";
	this.put_projectById = "https://todo.ly/api/projects/[projectId].json";
	this.delete_projectById = "https://todo.ly/api/projects/[projectId].json";
	this.get_itemsFromProjectById = "http://todo.ly/api/projects/[projectId]/Items.json";
	this.get_filters = "https://todo.ly/api/filters.json";
	this.get_filterById = "https://todo.ly/api/filters/[filterId].json";
	this.get_itemsFromFilterById = "https://todo.ly/api/filters/[filterId]/items.json";
	this.get_doneItemsFromFilterById = "https://todo.ly/api/filters/[filterId]/doneitems.json";
	this.get_items = "https://todo.ly/api/items.json";
	this.post_item = "https://todo.ly/api/items.json";
	this.get_itemById = "https://todo.ly/api/items/[itemId].json";
	this.put_itemById = "https://todo.ly/api/items/[itemId].json";
	this.delete_itemById = "https://todo.ly/api/items/[itemId].json";
	this.get_rootItemByChildId = "https://Todo.ly/API/Items/[childId]/RootItem.json";
	this.get_doneRootItemByChildId = "https://Todo.ly/API/Items/[childId]/DoneRootItem.json";
	this.get_iconsById = "https://todo.ly/api/icons/[iconId].json";
}
// TODO: improve the way variables are declared to make them read only, maybe using constants


module.exports = URLs;