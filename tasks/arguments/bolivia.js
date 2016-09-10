/**
 * Created by jalatraining on 9/10/2016.
 */

// Max number

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

