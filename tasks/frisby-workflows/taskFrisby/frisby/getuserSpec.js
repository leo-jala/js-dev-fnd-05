

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
 * Get User
=======
 * smock testing for Get User
>>>>>>> 03ade354491a5d0f4bebf669d6507046bc82689a
 *
 */

frisby.create('Verify Get User')
	.get('https://todo.ly/api/user.json')
	.inspectJSON()
	.expectJSONTypes(true)
	.expectStatus(200)
	.afterJSON(function(jsonresponse){
	
		console.log("Users created are :",jsonresponse);
				
	})
.toss();













