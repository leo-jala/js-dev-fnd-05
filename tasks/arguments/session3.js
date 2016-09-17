//Count words
var paragraph = "Hello world";

var countWords = function(par){
	return par.split(' ').length;
};
console.log('Paragraph: ', paragraph, ' has ', countWords(paragraph), 'words');

//Get the current date
var getCurrentDate = function() {
	var date = new Date();
	var now = new Date();
	var ampm = now.getHours() > 12 ? 'PM' : 'AM';
	return ("Today is:  " + date.getHours() + ampm + ":" + date.getMinutes() + ":" + date.getSeconds());
};

/*//Regular expression
var date = "2014-06-06";
var d = date.splipt("-");
var regExpYear = new RegExp(/^[2](4)$/);
var regExpDay = new RegExp(/[0-12](4)$/);*/

//Get the first capicua
var isCapicua = function(number) {
	var inv = invertir(number);
	var word = number.toString();
	var len = number.toString().length;
	var flag = true;
	while (len >= 0) {
		if (inv.charAt(len) != word.charAt(len)) {
			flag = false;
		}
		len--;
	}
	return flag;
}

var invertir = function(num) {
	var invertido = "";
	var len = num.toString().length;
	var word = num.toString();
	while (len >= 0) {
		invertido = invertido + word.toString().charAt(len);
		len--;
	}
	return invertido;
}

//Auto ejecutable
(function(name, name) {
	console.log(name, "");
})("Marco")