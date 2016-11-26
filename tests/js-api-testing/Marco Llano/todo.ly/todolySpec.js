//Todoly spec
var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization' : 'Basic bGxhbm8ubWFyY29AZ21haWwuY29tOjM2OXhsYnVqMjU=',
			'Content-Type' : 'application/json'
		}
	}	
});

//Creating and deleting all projects
frisby
	.create('Should  Deleting all projects from account')
	.get('https://todo.ly/api/projects.json')
	.afterJSON(function(jsonData){
		if(jsonData.length >= 2) {
			for (counter = 0; counter < jsonData.length; counter++) {
			console.log('Id: ' + jsonData[counter].Id)
			frisby
				.create('Should delete project' + jsonData[counter].Content + 'with id ' + jsonData[counter].Id)
				.delete('https://todo.ly/api/projects/' + jsonData[counter].Id + '.json')
				.expectStatus(200)
				.toss();			
			}
		} 
		else {
			frisby
				.create('Should create a project')
				.post('https://todo.ly/api/projects.json', {Content: "My first project frisby"}, { json: true })
				.after(function(err, res, body) {
					frisby
						.create('Should create a second project')
						.post('https://todo.ly/api/projects.json', {Content: "My second project frisby"}, { json: true })
					.toss()
				})
				.afterJSON(function(jsonData){
					frisby
						.create('should get all projects')
						.get('https://todo.ly/api/projects.json')
						.expectStatus(200)
						.afterJSON(function(jsonData){
							for (counter = 0; counter < jsonData.length; counter++) {
								console.log('Id: ' + jsonData[counter].Id)
								frisby
									.create('Should delete project' + jsonData[counter].Content + 'with id ' + jsonData[counter].Id)
									.delete('https://todo.ly/api/projects/' + jsonData[counter].Id + '.json')
									.expectStatus(200)
									.toss();			
							}
						})
					.toss();
				})
			.toss();	
		}
	})		
	.get('https://todo.ly/api/projects.json')
	.afterJSON(function(jsonData){
							for (counter = 0; counter < jsonData.length; counter++) {
								console.log('Id: ' + jsonData[counter].Id)			
							}
						})
	.expectStatus(200)
.toss();

//Creating a new user with invalid email format
frisby
	.create('Should create user with invalid email address')
	.post('https://todo.ly/api/user.json', 
		{
			Email: "doralaexploradora.com",			
			FullName: "hola mundo",
			Password: "123qwWe"
		}, { json: true })
	.expectJSON({Email : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/})
	.expectStatus(200)
.toss();

