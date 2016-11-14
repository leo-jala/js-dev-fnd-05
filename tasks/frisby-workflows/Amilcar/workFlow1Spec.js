/**
 * Created by Amilcar Maida on 11/5/2016.
 */

// workFlow1Spec.js

var frisby = require('frisby');
var faker = require('faker');


var name = faker.name.firstName();
var last = faker.name.lastName();
var email = name + '.' + last + '@gmail.com';

var newUser = {
    Email: email,
    Password: 'pASswoRd123!',
    FullName: name +' '+ last
};

//This test case does no require authorization
//The get user method returns the current authenticated user
//.expectJSON() Not apply due to the hide password with 'null'

frisby
    .create('A new user should be created without authorization')
    .post('https://todo.ly/api/user.json', newUser, {json: true})
    .expectStatus(200)
    .inspectJSON()
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .toss();

