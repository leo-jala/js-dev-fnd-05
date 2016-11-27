/**
 * Created by jalatraining on 11/26/2016.
 */
var frisby = require('frisby');
var faker = require('faker');

var options = {
    'Email' : 'wrong format email',
    'Password' : 'Control123*',
    'FullName' : 'pepito perez'
};
// test to verify that status code 400 (bad request) is returned when wrong format email is sent in the request.
frisby
    .create('Create a user')
    .post('https://todo.ly/api/user.json', options, {json: true})
    .expectJSON({ ErrorMessage: 'Invalid Email Address', ErrorCode: 307 })
    .afterJSON(function(jsonData){
        console.log(jsonData);
    })
    .toss();

