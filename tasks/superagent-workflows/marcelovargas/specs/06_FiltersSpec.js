//06_Filters.js

var faker = require('faker');
var CleanEnvironment = require('./../util/CleanEnvironment');
var Util = require('./../util/Util');

var TodoLy = require('./../framework/todoly');
var Filters = TodoLy.resources.filters;

describe('Todo.ly', function(){
	describe('Funtional Specs', function(){
		describe('Filters', function(){
			
			it('It Should Be Posible Get all filters.', function(done){
				Filters.getAll(function(err, response){
					expect(response.statusCode).toEqual(200);
					done();	
				});
			});
		});
	});
});