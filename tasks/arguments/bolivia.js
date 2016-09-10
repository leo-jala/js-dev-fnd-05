/**
 * Created by jalatraining on 9/10/2016.
 */

// Calculate total sum
var calculateSum = function (numbers, pos) {
    if(pos == 1) {
        return numbers[0];
    } else {
        return numbers[pos - 1] + calculateSum(numbers, pos - 1);
    }
};

function sum(ns) {
    return calculateSum(arguments, arguments.length);
}

//Calculate average

function average() {
    return calculateSum(arguments, arguments.length)/arguments.length;
}