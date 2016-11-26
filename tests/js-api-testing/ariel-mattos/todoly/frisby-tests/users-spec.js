/*
SCENARIO: Create user with invalid email address 
	When I attempt to create a user with invalid email address
	Then I should get appropriate app-error-code and message
*/

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic eGFpbmRlbmViQGdtYWlsLmNvbTouX3hkc18u'
		}
	}
});

var user = {
	Email: "Invalid email",
	FullName: "Jhon Doe",
	Passwor: "SuperSecretPassword"
};

var errorOnInvalidEmailAddress = {
  "ErrorMessage": "Invalid Email Address",
  "ErrorCode": 307
}

frisby
	.create('Create user with invalid email address')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.expectStatus(200)
	.expectJSON(errorOnInvalidEmailAddress)
	.afterJSON(function(error){
		console.log(error);
	})
	.toss();
