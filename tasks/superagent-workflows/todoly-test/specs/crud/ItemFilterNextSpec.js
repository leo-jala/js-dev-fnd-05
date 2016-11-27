var faker = require ('faker');

var TodoLy = require ('./../../framework/todoLy');
var Items = TodoLy.resources.items;

describe ('Todo.ly', function () {

    describe ('CRUD Spes', function () {

        describe ('Item', function () {

            var item;
            var itemNext;

            beforeEach (function (done) {
                item = {
                    Content: faker.name.title ()
                };
                itemNext = {
                    Content: "update",
                    "Priority": 3
                };

                Items.create (item, function (err, item) {
                    newItem = item;
                    done ();
                });
            });
            afterEach (function () {
                item = undefined;
                newItem = undefined;
            });

            it ('should allow to update item Content and Priority', function (done) {
                Items.update (newItem.Id, itemNext, function (err, itemnext) {
                    expect (itemNext.Content).toEqual (itemnext.Content);
                    done ();
                });
            });


            it ('should allow to Delete the filter.', function (done) {
                Items.delete (newItem.Id, function (err, item) {
                    expect (item.Deleted).toBeTruthy ();
                    done ();
                });
            });

        });
    });
});
