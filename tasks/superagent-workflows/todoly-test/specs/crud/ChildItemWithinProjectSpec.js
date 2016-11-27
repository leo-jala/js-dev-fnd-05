
var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;

describe('Todo.ly', function(){

    describe('CRUD Spes', function(){

        describe('Projects', function(){

            var project = {
                Content:  "Project"
            };
            var itemId = "";
            var itemData ={
                "Content": faker.name.title(),
                "Priority": 2,
                "ProjectId": ""
            };
            var updateItemValues = {
                "Content": faker.name.title(),
                "Priority": 3
            };

            it('should allow to create a  project.', function(done){

                Projects.create(project, function(err, project){
                    newProject = project;
                    itemData.ProjectId = project.Id;
                    expect(newProject.Content).toEqual(project.Content);
                    done();
                });

            });

            it('should allow to create child item.', function(done){
                Items.create(itemData, function(err, item){
                    itemId = item.Id;
                    expect(item.Content).toEqual(itemData.Content);
                    done();
                });
            });

            it('should allow to get child item.', function(done){
                Items.get(itemId, function(err, item){
                    expect(item.Content).toEqual(itemData.Content);
                    done();
                });
            });

            it('should allow to update item.', function(done){
                Items.update(itemId,updateItemValues, function(err, item){
                    expect(item.Content).toEqual(updateItemValues.Content);
                    done();
                });
            });

            it('should allow to delete item.', function(done){
                Items.delete(itemId, function(err, item) {
                    expect(item.Deleted).toBeTruthy();
                    done();
                });

            });


        });
    });
});

