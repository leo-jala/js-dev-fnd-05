// 02_ItShouldNotBePosibleToCreateAUserWithWrongEmailSpec.js

var frisby = require('frisby');
var faker = require('faker');
var URLs = require('./../../resources/URLs');
var Util = require('./../../util/Util');

// When I attempt to create a user with invalid email address
var name = faker.name.firstName();
var last = faker.name.lastName();
var email = name; // Here we put the email as wrong format
var pass = 'Control123!';
var newUser = {
	Email: email, 
	Password: pass, 
	FullName: name + ' ' + last
}

//Then I should get appropriate app-error-code and message
frisby
	.create('It Should get appropriate app-error-code and message.')
	.post(URLs.getUrl('post_user'), newUser, {json: true})
	.expectStatus(200)
	.inspectJSON()
	.expectJSON({
		ErrorMessage: 'Invalid Email Address',
		ErrorCode: 307 
	})
	.toss();