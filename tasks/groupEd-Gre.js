/**
 * Created by gretta rocha on 9/13/2016.
 */

/*
 *function to calculate the sum of all arguments
 */
var sum = function(numbers) {
    if(arguments.length == 1){
        // The iteration finishes when there are only one argument
        return numbers;
    };
    //sending to recursive function the list argument without the first element
    return numbers + sum.apply(null, Array.prototype.slice.call(arguments,1));
}

/*
 * Function to calculate the minimum value of all arguments
 */
var minValue = function (){
    var list = [];
    var min;
    if (arguments.length == 1){
        // The iteration finishes when there are only one argument
        return arguments[0];
    }
    else {
        if (arguments[0] >= arguments[1] ){
            //Compare the first two arguments to obtain the minimum value
            min = arguments[1];
        }
        else {
            min = arguments[0];
        }
        //remove the first element of array arguments
        var list = Array.prototype.slice.call(arguments,1);
        //saving the minimum value in the first position
        list[0] = min;
        // recursive process sending the array elements  as arguments
        return minValue.apply(null, list);
    }
}

/*
 * Function to calculate the maximun value of all arguments
 */
var maxValue = function (){
    var list = [];
    var max;
    if (arguments.length == 1){
        // The iteration finishes when there are only one argument
        return arguments[0];
    }
    else {
        //Compare the first two arguments to obtain the maximum value
        if (arguments[0] >= arguments[1] ){
            max = arguments[0];
        }
        else {
            max = arguments[1];
        }
        //remove the first element of array arguments
        var list = Array.prototype.slice.call(arguments,1);
        //saving the maximum value in the first position
        list[0] = max;
        // recursive process sending the array elements  as arguments
        return maxValue.apply(null, list);
    }
}

/*
 * Function to calculate the average of all elements of array
 */
var averageR = function(list, pos, total){
    if (pos == total - 1) {
        // The iteration finish when the last element of array is reached
        return list[pos];
    };

    if (pos == 0)
        return ((list[pos] + averageR(list, pos + 1, total)) / total);
    else
        return (list[pos] + averageR(list, pos + 1, total));
}

/*
 * Function to call the recursive function to calculate the average
 */
var average = function(){
    // sending arguments option as array
    return averageR(Array.prototype.slice.call(arguments) ,0, arguments.length)
}

var calculateValues = function (){
    console.log( arguments);
    console.log("Sum: " + sum.apply(null,arguments));
    console.log("Min: " + minValue.apply(null,arguments));
    console.log("Max: " + maxValue.apply(null,arguments));
    console.log("Average: " + average.apply(null,arguments));
}