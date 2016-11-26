/**
 * Created by jalatraining on 11/26/2016.
 */
/**
 * Created by jalatraining on 11/26/2016.
 */

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic Z3JldHRhcm9jaGExMjNAZ21haWwuY29tOkNvbnRyb2wxMjMq'
        }
    }
});

var newProject = {
    Content: 'aaaaa'
    //faker.name.title()
};
//test to verify taht after deleting all projects empty array projects is returned
frisby
    .create('Create at least a project')
    .post('https://todo.ly/api/projects.json', newProject, {json: true})
    .expectStatus(200)
    .expectJSON(newProject)
    .afterJSON(function(project){
        //console.log(project);
        frisby
            .create('Get all projects')
            .get('https://todo.ly/api/projects.json')
            .expectStatus(200)
            .afterJSON(function(jsonData){
                var total = jsonData.length;
                for(var i = 0; i < total; i++) {
                    var projectId = jsonData[i].Id;
                    frisby
                        .create('delete a project')
                        .delete('https://todo.ly/api/projects/' + projectId + '.json')
                        .expectStatus(200)
                        .afterJSON(function(project){
                        })
                        .toss();
                }
                frisby
                    .create('Get all projects')
                    .get('https://todo.ly/api/projects.json')
                    .expectStatus(200)
                    .expectJSONLength(0)
                    .toss();
            })
            .toss();
    })
    .toss();


