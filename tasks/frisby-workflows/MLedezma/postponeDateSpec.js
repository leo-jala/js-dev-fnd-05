//Verify that an item can be postponed for 5 days
var frisby = require('frisby');
var idNew;
var idItem;
var sufix = Date.now();
var dueDate = "11 Aug 2017 8:00 AM";
var newDate = "11 Aug 2022 8:00 AM";

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
									.afterJSON(function(jsonData){
									  idItem = jsonData.Id;
									  frisby
											.create('Set NEW due date to Item created')
											.post('https://todo.ly/api/items/'+idItem+'.json', {
												  DueDate: newDate
												},{json:true})
											.inspectJSON()
											.expectStatus(200)
											.expectJSON({
													Id: idItem,
													ProjectId: idNew,
													DueDate: newDate
											  })
											.toss();
								    })
								    .toss();
				          })
				          .toss();
				})
				.toss();					

	   })
	  .toss();

