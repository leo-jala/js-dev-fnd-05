/**
 * Created by jalatraining on 9/17/2016.
 */

var paragraph = 'hello world';

/**
 * Counts the number of words that a given paragraph has.
 * @param par, paragraph to work with.
 * @returns {Number}, number of words.
 */
var countWords = function (par) {
    return par.split(' ').length;
};

console.log('Paragraph: "', paragraph, '" has', countWords(paragraph), 'words');


var printCustomDate = function () {
    var  days = ['Sunday', '', '', '', '', '', 'Saturday'];
    var now = new Date();
    var today = days[now.getDay()];
    var hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    var xyz = now.getHours() > 12 ? 'PM' : 'AM';
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    console.log('Today is:', today);
    console.log('Current time is:', hours, xyz, ':', mins, ':', secs);
};

printCustomDate();


var isCapicua = function (num) {
    //....
    // returns booolean
}
/**
 *
 * @param offset
 * @param limit
 */
var getFirstCapicua = function (offset, limit) {
    //...
    isCapicua(5);
    //...
};

var x = 50;
var y = 100;
console.log('First capicua between', x, 'and', y, 'is:', getFirstCapicua(x, y));

// Anonymous function

/**
 *
 * @param {Number} numA
 * @param {Number} numB
 * @param {Function} cb
 */
var doOperation = function (numA, numB, cb) {
    // ...
    cb();
    cb();
    // ...
};

doOperation(1, 2, function () {
    console.log('hello');
});


// Auto-executable


(function (name, name2) {
    console.log(name, name2,
        ',I am auto-exec. AND, YOU WILL NEVER BE ABLE TO RUN AGAIN THIS LINE');
})('Leo', 'Pepe');





















