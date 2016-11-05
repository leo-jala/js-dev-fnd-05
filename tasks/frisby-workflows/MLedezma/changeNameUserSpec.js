//Verify that is possible to change the name of a user
var frisby = require('frisby');
var idUSer;
var sufix = Date.now();

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic bWFyaWEubGVkZXptYWhAZ21haWwuY29tOnRlc3QxMjMhMTIzIQ=='
		}
	}
	
});

frisby
	  .create('Get User Info')
	  .get('https://todo.ly/api/user.json')
	  .expectStatus(200)
	  .inspectJSON()
	  .afterJSON(function(jsonData){	  
		  idUSer = jsonData.Id;
		  frisby
				.create('Update user name')
				.post('https://todo.ly/api/user/0.json', {
					FullName: "Maria Antonieta Ledezma H."
				},{json:true})
				.expectStatus(200)
				.expectJSON({
								Id: idUSer,
								FullName: "Maria Antonieta Ledezma H."
							})
				.afterJSON(function (jsonDatason){
					idUSer = jsonData.Id;
					frisby
						  .create('Review new Name')
						  .get('https://todo.ly/api/user/0.json')
						  .expectStatus(200)
						  .inspectJSON()
						  .expectJSON({
								Id: idUSer,
								FullName: "Maria Antonieta Ledezma H."
							})
					.toss();					
				})
				
				.toss();
	  })
	  .toss();

