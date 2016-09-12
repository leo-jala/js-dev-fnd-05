/**
 * Created by Veronica y Miguel on 9/10/2016.
 */

var maxNumber = function(number, pos){
    if(number[pos -1] > max){
        max = number[pos -1];
    }
    if(pos != 0){
        maxNumber(number, pos - 1);
    }
    return max;
};

var minNumber = function(number, pos){
    if(number[pos -1] < min){
        min = number[pos -1];
    }
    if(pos != 0){
        minNumber(number, pos - 1);
    }
    return min;
};

var totalNumber = function(number, pos){
    var argumentPosition = pos - 1;
    total += number[argumentPosition];
    if(argumentPosition > 0){
        totalNumber(number, argumentPosition);
    }
    return total;
};

var avgNumber = function(number, pos){
    var argumentPosition = pos - 1;
    totalAvg += number[argumentPosition];
    if(argumentPosition > 0) {
        avgNumber(number, argumentPosition);
    }
    else {
        totalAvg /= totalArguments;
    }
    return totalAvg;
};

var totalArguments, max, min, total, totalAvg;

var main = function() {
    max = 0;
    total = 0;
    totalAvg = 0;
    totalArguments = arguments.length;

    maxNumber(arguments, arguments.length);
    console.log('Max: ' + max);
    min = max;

    minNumber(arguments, arguments.length);
    console.log('Min: ' + min);

    totalNumber(arguments, arguments.length);
    console.log('Total: ' + total);

    avgNumber(arguments, arguments.length);
    console.log('Average: ' + totalAvg);
};

