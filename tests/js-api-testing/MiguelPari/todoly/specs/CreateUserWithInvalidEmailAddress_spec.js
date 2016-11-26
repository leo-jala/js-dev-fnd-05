// CreateUserWithInvalidEmailAddress_spec.js

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic bWlndWVsLmFuZ2VsQG1haWwuY29tOk0xZ3UzbC40bmczbA=='
		}
	}
});

var userWithInvalidMail = {
	Email: 'mail.com@',
	FullName: faker.name.title(),
	Password: 'Control123'
};

frisby
	.create(' Create user with invalid email address ')
	.post('https://todo.ly/api/user.json', userWithInvalidMail, {json: true})
	.expectStatus(200)	
	.afterJSON(function(json) {
		expect(json.ErrorMessage).toBe('Invalid Email Address');
	})
	.toss();