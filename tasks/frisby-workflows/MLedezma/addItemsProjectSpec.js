//Verify that some items can be added to a new project in todo.ly
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
			  Content: "ProjectWithItems-"+sufix
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
				.afterJSON(function(jsonData){
					idNew = jsonData.Id;
					frisby
						  .create('Add Item to the new Project')
						  .post('https://todo.ly/api/items.json', {
							  Content: "TEST Item",
							  ProjectId: idNew
						  },{json:true})
						  .inspectJSON()
						  .expectStatus(200)
						  .expectJSON({
							            Content: "TEST Item",
							            ProjectId: idNew
									  })
						  .toss();
				})
				.toss();					

	   })
	  .toss();

