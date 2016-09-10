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

//Calculate max value
var calculateMax = function (numbers, pos, max) {
    if(pos == 1) {
        if (numbers[0] > max) {
            return numbers[0];
        }
        else {
            return max;
        }
    } else {
        if (numbers[pos - 1] > max) {
            return calculateMax(numbers, pos - 1, numbers[pos - 1]);
        } else {
            return calculateMax(numbers, pos - 1, max);
        }
    }
};

function max() {
    return calculateMax(arguments, arguments.length, arguments[arguments.length - 1])
}

//Calculate min
var calculateMin = function (numbers, pos, min) {
    if(pos == 1) {
        if (numbers[0] < min) {
            return numbers[0];
        }
        else {
            return min;
        }
    } else {
        if (numbers[pos - 1] < min) {
            return calculateMin(numbers, pos - 1, numbers[pos - 1]);
        } else {
            return calculateMin(numbers, pos - 1, min);
        }
    }
};

function min() {
    return calculateMin(arguments, arguments.length, arguments[arguments.length - 1])
}