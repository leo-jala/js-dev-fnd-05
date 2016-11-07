//06_Filters.js

var frisby = require('/usr/local/lib/node_modules/frisby');
var faker = require('/usr/local/lib/node_modules/faker');
var URLs = require('./../resources/URLs');
var payloadBuild = require('./../resources/payloadBasic.json');
var Util = require('./../util/Util');

URLs = new URLs();
Util = new Util();

frisby.globalSetup({
		request: {
			headers: {
				'Authorization': Util.getEncondedString()
			}
		}
	});

frisby
	.create('Get all filters')
	.get(URLs.get_filters)
	.expectStatus(200)
	.afterJSON(function(filters){
		for (var i = 0; i < (filters.length-1); i++) {
			frisby
				.create('Get filters by id')
				.get(URLs.get_filterById.replace('[filterId]', filters[i].Id))
				.expectStatus(200)
				.inspectJSON()
				.toss();
		};		
	})
	.toss();

