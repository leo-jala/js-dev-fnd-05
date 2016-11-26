
var faker = require('faker');
var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;
describe('Todo.ly', function(){

    describe('CRUD Spes', function(){

        describe('Projects', function(){

            var initialItems;
            var itemData ={
                "Content": faker.name.title(),
                "DueDate": 2
            };
            var item = {
                Content:  "Project"
            };
            var itemId = "";
            var newItem;
            var updateItemValues = {
                "Checked": true

            };
            //Gets all the availables items
            it('should allow to get all items.', function(done){
                Items.getAll(function(err, items){
                    expect(items).not.toBeUndefined();
                    initialItems = items;
                    done();
                });
            });
            //Deletes all items
            it('should allow to delete a  item.', function(done){
                for(var i=0; i<initialItems.length; i++){
                    Items.delete(initialItems[i].Id, function(err, item){
                        expect(item.Deleted).toBeTruthy();
                    });
                }done();

            });

            //Creates a child item
            it('should allow to create child item.', function(done){
                Items.create(itemData, function(err, item){
                    itemId = item.Id;
                    itemData = item;
                    expect(item.Content).toEqual(itemData.Content);
                    console.log(item);
                    done();
                });

            });

            //Creates a item
            it('should allow to get filered items.', function(done){
                var now = new Date();
                var day = now.getUTCDate();
                var month = now.getUTCMonth()+1;
                var year = now.getUTCFullYear();
                var today = month + "/" + day + "/" + year;
                itemData.DueDate = today;
                console.log(today);
                Items.getFiltered(-1, function(err, item){
                    newItem = item;
                    expect(newItem.Content).toEqual(item.Content);
                    console.log(newItem.Content);
                    done();
                });

            });

            //Item is checked, it means
            xit('should allow to delete item.', function(done){
                Items.update(itemId,updateItemValues, function(err, item){
                    expect(item.Checked).toEqual(updateItemValues.Checked);
                    done();
                });
            });
        });
    });
});

