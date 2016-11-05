//Verify that an item can be deleted from a specific project
var frisby = require('frisby');
var idNew;
var idItem;
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
						  .afterJSON(function(jsonData){
					          idItem = jsonData.Id;
					          frisby
						            .create('Delete Item Created')
						            .delete('https://todo.ly/api/items/'+idItem+'.json',{json:true})
						            .expectStatus(200)
						            .expectJSON({
							                Id: idItem,
											Content: "TEST Item",
							                ProjectId: idNew
									  })
									.afterJSON(function(jsonData){
										  frisby
												.create('Review Item was deleted')
												.get('https://todo.ly/api/items/'+jsonData.Id+'.json') 
												.expectStatus(200)
												.expectBodyContains("") 
												.toss();
								    })
						            .toss();
				          })
				          .toss();
				})
				.toss();					

	   })
	  .toss();

