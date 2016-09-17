//1st way to create a class
var Person = function (name, age) {
	
	//Properties
	this.name = name;
	this.age = age;
	
	/*//Methods
	this.sayHello = function() {
		console.log('Hello, my name is', this.name);
	};*/
};

//Methods
	Person.sayHello = function() {
		console.log('Hello, , this is a static method, only called from class my name is', this.name);
	};

	Person.prototype.sayHello = function() {
		console.log('Hello my name is', this.name);
	};
	
var luis = new Person('Luis', 23);