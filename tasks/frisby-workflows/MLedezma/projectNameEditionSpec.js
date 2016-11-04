//1. Verify that a project name can be edited
var frisby = require('frisby');
var idNew;
var sufix = Date.now();

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic bWFyaWEubGVkZXptYWhAZ21haWwuY29tOnRlc3QxMjMhMTIzIQ=='
		}
	}
	
});

frisby
	  .create('Create New Project')
	  .post('https://todo.ly/api/projects.json',{
			  Content: "Maria Project-"+sufix
		    },{json:true})
	  .expectStatus(200)
	  .afterJSON(function(jsonData){	  
		  idNew = jsonData.Id;
		  frisby
				.create('Review New Project')
				.get('https://todo.ly/api/projects/'+idNew+'.json')
				.inspectJSON()
				.expectStatus(200)
				.expectJSON({Id: idNew})
				.afterJSON(function (jsonDatason){
					idNew = jsonData.Id;
					frisby
						  .create('Edit Name of Project Created')
						  .post('https://todo.ly/api/projects/' + idNew + '.json',{
								  Content: "Renamed Project-"+sufix
								},{json:true})
						  .expectStatus(200)
						  .afterJSON(function(jsonData){
							  frisby
									.create('Review Renamed Project')
									.get('https://todo.ly/api/projects/'+idNew+'.json')
									.inspectJSON()
									.expectStatus(200)
									.expectJSON({
												 Id: idNew,
												 Content: "Renamed Project-"+sufix
												})
									.toss();
					})
					.toss();					
				})
				
				.toss();
	  })
	  .toss();

