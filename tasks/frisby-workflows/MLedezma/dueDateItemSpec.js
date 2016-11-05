//Verify that is possible to save a due date to the item of a project
var frisby = require('frisby');
var idNew;
var idItem;
var sufix = Date.now();
var dueDate = "31 Aug 2027 8:30 AM"

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
						            .create('Set due date to Item created')
						            .post('https://todo.ly/api/items/'+idItem+'.json', {
							              DueDate: dueDate
						                },{json:true})
						            .inspectJSON()
						            .expectStatus(200)
						            .expectJSON({
											Id: idItem,
							                ProjectId: idNew,
											DueDate: dueDate
									  })
						            .toss();
				          })
				          .toss();
				})
				.toss();					

	   })
	  .toss();

