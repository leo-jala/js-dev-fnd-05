// config.js

// TODO: Improve. Currently properties are not read-only
var properties = {
	BasicToken: 'bWd2aXNjYXJyYUBnbWFpbC5jb206QWRtaW4xMjM=',
	BASE_URL: 'https://todo.ly/api/'
};

var config = {
	getProperty: function(name) {
		// Check if property exists
		return properties[name];
	},
	setProperty: function(name, value) {
		properties[name] = value;
	}
};

module.exports = config;
