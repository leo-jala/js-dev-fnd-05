//05_ItShouldBePosibleToDeleteCreatedUserSpec.js

var frisby = require('/usr/local/lib/node_modules/frisby');
var faker = require('/usr/local/lib/node_modules/faker');
var URLs = require('./../resources/URLs');
var payloadBuild = require('./../resources/payloadBasic.json');
var Util = require('./../util/Util');

URLs = new URLs();
Util = new Util();

var name = faker.name.firstName();
var last = faker.name.lastName();
var email = name + '.' + last + '@hotmail.com';
var pass = 'Control123!';
var newUser = {
	Email: email, 
	Password: pass, 
	FullName: name + ' ' + last
}

frisby
	.create('It should be posible to delete recently created user.')
	.post(URLs.post_user, newUser, {json: true})
	.expectStatus(200)
	.inspectJSON()
	.afterJSON(function(user){
		frisby
			.create('Delete created user')
			.addHeader('Authorization', Util.getCustomEnconded(email, pass))
			.delete(URLs.delete_user)
			.expectStatus(200)
			.toss();
	})
	.toss();