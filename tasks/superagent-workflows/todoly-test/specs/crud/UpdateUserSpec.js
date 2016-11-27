var faker = require ('faker');

var TodoLy = require ('./../../framework/todoLy');
var Users = TodoLy.resources.users;

describe ('Todo.ly', function () {

    describe ('CRUD Spes', function () {

        describe ('Item', function () {

            var user;
            var userUpdate;
            beforeEach (function (done) {
               user = {

                    "Password": 'dfff',
                    "FullName": 'javasrettttetete',
                   "Email" : 'user@email.com'
                };
                userUpdate = {
                    "FullName": 'jaff'
                };

                Users.create(user, function (err, user) {
                    console.log(user,"******222**************")
                    newUser = user;
                    done ();
                });
            });
            afterEach (function () {
                user = undefined;
                newUser = undefined;
            });

            it ('should allow to create User', function (done) {
                Users.update (newUser.Id, userUpdate, function (err, userupdate) {
                    console.log(newUser,"********************")
                    expect (newUser.Email).toEqual(userupdate.Email);
                    done ();
                });
            });

            it ('should allow to update ', function (done) {
                Users.update (newUser.Id, userUpdate, function (err, update) {
                    expect (newUser.Id).toEqual(update.Id);
                    done ();
                });
            });
        });
    });
});
