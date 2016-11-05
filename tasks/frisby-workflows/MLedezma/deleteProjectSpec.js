//3. Verify that a specific project can be deleted
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
			  Content: "DeleteProject-"+sufix
		    },{json:true})
	  .expectStatus(200)
	  .afterJSON(function(jsonData){	  
		  idNew = jsonData.Id;
		  frisby
				.create('Review New Project')
				.get('https://todo.ly/api/projects/'+idNew+'.json')
				.inspectJSON()
				.expectStatus(200)
				.expectJSON({
					          Id: idNew
							})
				.afterJSON(function (jsonDatason){
					idNew = jsonData.Id;
					frisby
						  .create('Delete Project Created')
						  .delete('https://todo.ly/api/projects/' + idNew + '.json', {json:true})
						  .expectStatus(200)
						  .expectJSON({
												 Id: idNew,
												 Content: "DeleteProject-"+sufix
									  })
						  .afterJSON(function(jsonData){
							  frisby
									.create('Review Project was deleted')
									.get('https://todo.ly/api/projects/'+jsonData.Id+'.json') 
									.expectStatus(200)
									.expectBodyContains("") 
									.toss();
					        })
					      .toss();					
				})
				
				.toss();
	  })
	  .toss();

