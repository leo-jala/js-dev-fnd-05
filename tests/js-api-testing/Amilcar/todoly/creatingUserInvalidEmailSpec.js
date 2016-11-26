// creatingUserInvalidEmialSpec.js

var frisby = require('frisby');
var faker = require('faker');


var name = faker.name.firstName();
var last = faker.name.lastName();
var email = name + '.' + last + 'gmailcom';

var newUser = {
    Email: email,
    Password: 'pASswoRd123!',
    FullName: name +' '+ last
};


frisby
    .create('A new user should not be created due to invalid email')
    .post('https://todo.ly/api/user.json', newUser, {json: true})
    .expectStatus(200)        
	//.expectJSON(undefined)	
	.inspectJSON()
    .toss();