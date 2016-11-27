/**
 * Created by jalatraining on 11/26/2016.
 */
var request = require('superagent');
var faker = require('faker');

var BasicToken = 'Basic Z3JldHRhcm9jaGExMjNAZ21haWwuY29tOkNvbnRyb2wxMjMq';
var BASE_URL = 'https://todo.ly/api/';

describe('Projects', function(){
    it('should allow marking an item as complete', function(done){
        // Create a project
        var project = {
            Content:  faker.name.title()
        };
        request
            .post(BASE_URL + 'projects.json')
            .set('Authorization', BasicToken)
            .send(project)
            .end(function(err, res){
                var item = {
                    Content: faker.name.title(),
                    ProjectId: res.body.Id
                };
                // create item for project
                request
                    .post(BASE_URL + 'items.json')
                    .set('Authorization', BasicToken)
                    .send(item)
                    .end( function(err, res){
                        // marking item as completed
                        var itemId = res.body.Id;
                        var param = {"Checked" : "true" };
                        request
                            .post(BASE_URL + 'items/' + itemId + '.json')
                            .set('Authorization', BasicToken)
                            .send(param)
                            .end( function(err, res){
                                // getting completed items
                                request
                                    .get(BASE_URL + 'projects/' + item.ProjectId +'/doneitems.json')
                                    .set('Authorization', BasicToken)
                                    .end(function(err, res){
                                        expect(res.body.length).toBeGreaterThan(0);
                                        expect(res.body[0].Id).toEqual(itemId);
                                        done();
                                    });
                             });
                    });
            });
    });

    it('should move item to Recycle Bin list', function(done){
        //create an Inbox item setting the due-date to the past
        var item = {
            ProjectId: 0,
            Content: faker.name.title(),
            DueDate: "2016-02-01"
        };
        request
            .post(BASE_URL + 'items.json')
            .set('Authorization', BasicToken)
            .send(item)
            .end( function(err, res){
                //verify that created item is in the Today project
                var itemId = res.body.Id;
                request
                    .get(BASE_URL + 'filters/-1/items.json')
                    .set('Authorization', BasicToken)
                    .end(function(err, res) {
                        expect(res.body.length).toBeGreaterThan(0);
                        expect(res.body[0].Id).toEqual(itemId);
                        //delete the item
                        request
                            .delete(BASE_URL + '/items/' + itemId + '.json')
                            .set('Authorization', BasicToken)
                            .end(function(err, res) {
                                var itemDel = res.body;
                                expect(itemDel.Deleted).toBeTruthy();
                                expect(itemDel.Id).toEqual(itemId);
                                //verify that deleted item is in the Recycle Bin list
                                request
                                    .get(BASE_URL + 'filters/-3/items.json')
                                    .set('Authorization', BasicToken)
                                    .end(function(err, res) {
                                        var total = res.body.length;
                                        var exist = false;
                                        for(var i = 0; i < total; i++) {
                                            if (res.body[i].Id == itemId) {
                                                exist = true;
                                            }
                                        }
                                        expect(exist).toBeTruthy();
                                        done();
                                    });
                               });
                    });
            });
     });
});

