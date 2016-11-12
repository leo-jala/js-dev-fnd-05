// Frisby tests

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
		'Authorization': 'Basic Token'
		}
	
	}
});

/**
<<<<<<< HEAD
 *Delete User
=======
 * smock testing for Delete User
>>>>>>> 03ade354491a5d0f4bebf669d6507046bc82689a
 *
 */


var user = {
"Email": 'cursojvascriptt@gmail.com',
"Password": 'passwordtt',
"FullName": 'javascriptt'
};

frisby.create('Verify Create User')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
	
		frisby.create('Verify Delete User')
			.delete('https://todo.ly/api/user/' + jsonresponse.Id + '.json')
			.inspectJSON()
			.expectStatus(200)	 
	})
.toss();












