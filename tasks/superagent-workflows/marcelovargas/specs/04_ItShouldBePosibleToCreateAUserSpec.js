//04_ItShouldBePosibleToCreateAUserSpec.js

var faker = require('faker');
var CleanEnvironment = require('./../util/CleanEnvironment');
var Util = require('./../util/Util');

var TodoLy = require('./../framework/todoly');
var Users = TodoLy.resources.users;

var name = faker.name.firstName();
var last = faker.name.lastName();
var email = name + '.' + last + '@hotmail.com';
var pass = 'Control123!';
var userBody = {
	Email: email, 
	Password: pass, 
	FullName: name + ' ' + last
}

var token = Util.getCustomEnconded(userBody.Email, userBody.Password);

describe('Todo.ly', function(){
	describe('CRUD Specs', function(){
		describe('Users', function(){
			
			it('It Should Be Posible To Create A User Without Authorization and Login.', function(done){
				Users.create(userBody, function(err, response){
					expect(response.statusCode).toEqual(200);
					Users.get(token, function(err, res){
						expect(res.statusCode).toEqual(200);
						done();	
					})
				});
			});
		});
	});
});