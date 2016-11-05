//2. Verify that it is possible to change the icon of a project
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
			  Content: "Icon Project-"+sufix
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
					          Id: idNew,
							  Icon: 0
							})
				.afterJSON(function (jsonDatason){
					idNew = jsonData.Id;
					frisby
						  .create('Change icon of Project Created')
						  .post('https://todo.ly/api/projects/' + idNew + '.json',{
								  Icon: 6
								},{json:true})
						  .expectStatus(200)
						  .afterJSON(function(jsonData){
							  frisby
									.create('Review new Icon for the Project')
									.get('https://todo.ly/api/projects/'+idNew+'.json')
									.inspectJSON()
									.expectStatus(200)
									.expectJSON({
												 Id: idNew,
												 Icon: 6
												})
									.toss();
					})
					.toss();					
				})
				
				.toss();
	  })
	  .toss();

