var faker = require ('faker');

var TodoLy = require ('./../../framework/todoLy');
var Items = TodoLy.resources.items;

describe ('Todo.ly', function () {

    describe ('CRUD Spes', function () {

        describe ('Item', function () {

            var item;

            beforeEach (function (done) {
                item = {
                    Content: faker.name.title ()
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

            it ('should allow to get all Items.', function (done) {
                Items.getAll (function (err, items) {
                    expect (items).not.toBeUndefined ();
                    expect (items.length).toBeGreaterThan (0);
                    done ();
                });
            });


            it ('should allow to delete item.', function (done) {
                Items.delete (newItem.Id, function (err, item) {
                    console.log (item, "deletw")
                    expect (item.Deleted).toBeTruthy ();
                    done ();
                });
            });

            it ('should allow to create a at least 2 Items.', function (done) {
                item1 = {
                    Content: faker.name.title ()
                };
                Items.create (item1, function (err, item1) {
                    newItem1 = item1;

                    Items.getAll (function (err, items) {
                        expect (items).not.toBeUndefined ();
                        expect (items.length).toBeGreaterThan (1);
                        expect (newItem.Content).toEqual (item.Content);
                        expect (newItem1.Content).toEqual (item1.Content);
                        done ();
                    });

                });
            });Users
        });
    });
});
