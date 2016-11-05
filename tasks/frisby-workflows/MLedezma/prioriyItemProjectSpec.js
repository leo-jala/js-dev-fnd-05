//Verify that it can be set a priority to item from a project
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
									.create('Set priority assigned to Item')
									.post('https://todo.ly/api/items/'+idItem+'.json', {
						              Priority: 1
					                },{json:true})
									.inspectJSON()
									.expectStatus(200)
									.expectJSON({
											Priority: 1,
											ProjectId: idNew
									  })
									.toss();
						  })
						  .toss();
				})
				.toss();					
		   })
		  .toss();

