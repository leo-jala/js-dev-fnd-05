// Google test

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic bWd2aXNjYXJyYUBnbWFpbC5jb206QWRtaW4xMjM='
		}
	}
});




frisby
	.create('Todo.ly should return a list of all projects.')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(jsonData){	
	if(jsonData.lenght>=2){
		for(var i=0; i<jsonData.length; i++){
				 frisby.create('Delete project with ID:' + jsonData[i].Id)
                    .delete('https://todo.ly/api/projects/' + jsonData[i].Id +'.json' )
                    .inspectJSON()
                    .expectJSON({Deleted: true})
					.afterJSON(function(jsonData){
						frisby
							.create('Todo.ly should return a list of all projects.')
							.get('https://todo.ly/api/projects.json')
							.expectStatus(200)
							.expectJSON([]).toss();
				}).toss();
			}
	}else{
		for(var i=jsonData.length; i<2; i++){
			console.log("dsfsd");
			var newProject = {Content: "Project"+i};
			frisby
			.create('All items from a project has same projectId value')
			.post('https://todo.ly/api/projects.json', newProject, {json: true})
			.expectStatus(200)
			.expectJSON(newProject)
			.afterJSON(function(jsonData){
				frisby
					.create('Todo.ly should return a list of all projects.')
					.get('https://todo.ly/api/projects.json')
					.expectStatus(200)
					.afterJSON(function(jsonData){	
						for(var i=0; i<jsonData.length; i++){
							frisby.create('Delete project with ID:' + jsonData[i].Id)
								.delete('https://todo.ly/api/projects/' + jsonData[i].Id +'.json' )
								.inspectJSON()
								.expectJSON({Deleted: true})
								.afterJSON(function(jsonData){
									frisby
										.create('Todo.ly should return a list of all projects.')
										.get('https://todo.ly/api/projects.json')
										.expectStatus(200)
										.expectJSON([]).toss();
								}).toss();
						}
					}).toss();
			}).toss();
		}
	}
	}).toss();