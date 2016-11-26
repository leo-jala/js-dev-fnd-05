/**
 * Created by Amilcar Maida on 11/8/2016.
 */

// workFlow2Spec.js

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic bGVvLmZjeEBnbWFpbC5jb206bGVvIUAjNDU2'
        }
    }
});

//The get user method returns the current authenticated user only

frisby
    .create('The current authenticated user should be obtained')
    .get('https://todo.ly/api/user.json')
    .expectStatus(200)
    .inspectJSON()
    .afterJSON(function(json){
        var updatingCurrentUser = {
            "Email": "leo.fcx_updated123@gmail.com",
            "FullName": "Pedrito123"
        };
        frisby
            .create('The current authenticated user should be updated')
            .post('https://todo.ly/api/user/0.json', updatingCurrentUser,{json:true})
            .expectStatus(200)
            .inspectJSON()
			.afterJSON(function(json){
				frisby
					.create('The current authenticated user should be delete')
					.delete('https://todo.ly/api/user/0.json')
					.expectStatus(200)
					.inspectJSON()
					.toss();
			})
            .toss();
    })
    .toss();