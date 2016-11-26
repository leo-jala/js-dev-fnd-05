/**
 * Created by jalatraining on 11/26/2016.
 */
var frisby = require('frisby');
var faker = require('faker');

/*frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic Z3JldHRhcm9jaGExMjNAZ21haWwuY29tOkNvbnRyb2wxMjMq'
        }
    }
});
*/
var options = {
    'Email' : 'wrong fromatemail',
    'Password' : 'Control123*',
    'FullName' : 'pepito perez'
};
// test to verify that status code 400 (bad request) is returned when wrong format email is sent in the request.
frisby
    .create('Create a user')
    .post('https://todo.ly/api/user.json', options)
    .expectStatus(400)
    .afterJSON(function(jsonData){
        console.log(jsonData);
    })
    .toss();

