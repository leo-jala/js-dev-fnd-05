/**
 * Created by leo on 9/9/2016.
 */
var age = '';
var calculateAge = function (bornYear){
    var age = 2016 - bornYear;
    return age;
};
age = calculateAge(2000);
//console.log(age);


var index = 0;
var max = 0;
var min;
var sum = 0;
var myArray;
var length = 0;
var calculate = function (){
        if (index == 0){
            myArray = calculate.arguments;
            length = calculate.arguments.length;
            min = myArray[index];
        }
        if (index < (length)) {
            max = Math.max(myArray[index], max);
            min = Math.min(myArray[index], min);
            sum = sum + myArray[index];
            index++;
            calculate(myArray);
        }
        else {
            console.log(max);
            console.log(min);
            console.log(sum);
            console.log(sum / length);

            index = 0;
            max = 0;
            min = 0;
            avg = 0;
            sum = 0;
        }

};

calculate(15,2,4,25,6,47,8);