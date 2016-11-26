/*
SCENARIO: Moving item to Recycle Bin list
  Given I don't have items in my Inbox 
  When I create an Inbox item setting the due-date to the past
  Then I should see that item listed in Today's item 
  When I delete that item
  Then I should be able to see it in Recycle Bin list
 */

var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;
var Filters = TodoLy.resources.filters;
var ProjectsHelper = TodoLy.helpers.projects;
var FiltersHelper = TodoLy.helpers.filters;

describe('Todo.ly', function () {

  describe('Workflow specs', function () {

    describe('Items', function () {

      beforeEach(function (done) {
        FiltersHelper.cleanUp(done);
      });

      it('should be able to see deleted inbox item in Recycle Bin list', function (done) {
        var firstItemData = {
          Content: faker.name.title(),
          DueDate: '/Date(' + (Date.now() - 1) + ')/'
        };

        Items.create(firstItemData, function (err, item) {
          var TodayFilterId = -1;
          Filters.getItems(TodayFilterId, function (err, items) {

            var result = items.filter(function(i) {
              return i.Id === item.Id;
            })[0];

            console.log(result)
            done();  
          });
        });
      });
    });
  });
});
