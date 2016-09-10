/**
 * @author Maria Ledezma
 * @author Marcelo Vargas
 * @title Exercise 1
 * @date 09/10/2016
 */
// variables initialization
var index = 0;
var max = 0;
var min;
var sum = 0;
var myArray;
var length = 0;
var nanCount = 0;

/**
 * function to calculate the MAX, MIN, SUM and AVERAGE of a list of numbers.
 * If a number is not an interger it will be skipped and only valida numbers will be including in calculation
 * @parameters N integer numbers
 */
var calculate = function (){
        if (index == 0){
            //for the first case, assignation of base values
            myArray = calculate.arguments;
            length = calculate.arguments.length;
            min = myArray[index];
        }
        if (index < (length)) {
            if (!isNaN(myArray[index])){
                max = Math.max(myArray[index], max);
                min = !isNaN(min)?Math.min(myArray[index], min): Math.min(myArray[index]);
                sum = sum + myArray[index];
            }
            else{
                nanCount++;
            }

            index++;
            calculate(myArray);
        }
        else {
            console.log(max);
            console.log(min);
            console.log(sum);
            console.log(sum / (length-nanCount));

            //clean up of variables
            index = 0;
            max = 0;
            min = 0;
            avg = 0;
            sum = 0;
        }

};
// Fixed Example
calculate(15,2,4,-25,6,47,8);