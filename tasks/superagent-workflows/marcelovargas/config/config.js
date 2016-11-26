// config.js
var Util = require('./../util/Util');

/**
 * General properties
 * @type {Object}
 */
var properties = {
	BASIC_TOKEN: Util.getEncondedString(),
	BASE_URL: 'https://todo.ly/',
	API_VERSION: 'api/'
};

/**
 * A method to make properties read-only
 * @type {Object}
 */
var config = {
	getProperty: function(name) {
		return properties[name];
	},
	setProperty: function(name, value) {
		properties[name] = value;
	}
};

module.exports = config;
