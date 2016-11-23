/**
 * Created by Mauricio Viscarra and Amilcar Maida on 9/10/2016.
 */

/**
 *
 * @param array of numbers
 * @param index
 * @returns {The max number}
 */
var getMaxNumber = function(numbers, index){
    if(index > 0){
        return Math.max(numbers[index], getMaxNumber(numbers, index-1));
    }
    else{
        return numbers[0];
    }
}
/**
 * @param a list of numbers, example 1,2,3,4
 * @returns {The max number}
 */
var calculateMaxNumber = function (){
    var amountOfNumbers = arguments.length-1;
    var maxNumber = getMaxNumber(arguments,amountOfNumbers);
    return maxNumber;
}

/**
 *
 * @param array of numbers
 * @param index
 * @returns {The min number}
 */
var getMinNumber = function(numbers, index){
    if(index > 0){
        return Math.min(numbers[index], getMinNumber(numbers, index-1));
    }
    else{
        return numbers[0];
    }
}
/**
 * @param a list of numbers, example 1,2,3,4
 * @returns {The min number}
 */
var calculateMinNumber = function (){
    var amountOfNumbers = arguments.length-1;
    var maxNumber = getMinNumber(arguments,amountOfNumbers);
    return maxNumber;
}
/**
 *
 * @param array of numbers
 * @param index
 * @returns {Avg of the numbers}
 */
var getAvg= function(numbers, index){
    var sum;
    if(index==1){
        sum = numbers[0];
    }else{
        sum = numbers[index-1]+(index-1)*getAvg(numbers,index-1);
    }
    var avg = sum/index;
    return avg;
}
/**
 * @param a list of numbers, example 1,2,3,4
 * @returns {Avg of the numbers}
 */
var calculateAvgNumber = function (){
    var amountOfNumbers = arguments.length;
    var avgNumber = getAvg(arguments,amountOfNumbers);
    return avgNumber;
}
/**
 *
 * @param array of numbers
 * @param index
 * @returns {Total Sum of the numbers}
 */
var getTotalSum= function(numbers, index){
    var sum;
    if(index==1){
        sum = numbers[0];
    }else{
        sum = numbers[index-1]+getTotalSum(numbers,index-1);
    }
    return sum;
}
/**
 * @param a list of numbers, example 1,2,3,4
 * @returns {Total sum of the numbers}
 */
var calculateTotalSumNumber = function (){
    var amountOfNumbers = arguments.length;
    var totalSumNumber = getTotalSum(arguments,amountOfNumbers);
    return totalSumNumber;
}

console.log('The min number is: '+ calculateMinNumber(1,4,7,3,6,3,9,6,7));
console.log('The max number is: '+ calculateMaxNumber(1,4,7,3,6,3,9,6,7));
console.log('The average is: '+ calculateAvgNumber(1,2,3,4,5));
console.log('The total sum is: '+ calculateTotalSumNumber(1,2,3,4,5,15));

