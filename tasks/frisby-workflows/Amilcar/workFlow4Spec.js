/**
 * Created by Amilcar Maida on 11/8/2016.
 */

// workFlow4Spec.js

var frisby = require('frisby');
var faker = require('faker');

frisby
    .create('Returns whether the current request is Authenticated.')
    .get('https://todo.ly/api/authentication/isauthenticated.json')
    .expectStatus(200)
    .inspectJSON()
	.toss();
