/**
 * Created by Amilcar Maida on 11/8/2016.
 */

// workFlow3Spec.js

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic bGVvLmZjeEBnbWFpbC5jb206bGVvIUAjNDU2'
        }
    }
});

frisby
    .create('List of all filters of current authenticated user should be returned')
    .get('https://todo.ly/api/filters.json')
    .expectStatus(200)
    .inspectJSON()
	.toss();
