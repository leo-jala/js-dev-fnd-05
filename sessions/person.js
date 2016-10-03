
// 1st way to create and object

var pepe = {
    name: 'Pepe',
    age: 12,
    sayHello: function() {
        console.log('Hello, my name is', this.name);
    }
};

// 2nd way

var paco =  new Object();
paco.name = 'Paco';
paco.sayHello = function() {
    console.log('Hello, my name is', this.name);
}

// 1st way to create a class

var Person = function (name, age) {

    // Properties
    this.name = name;
    this.age = age;

    // Methods
    this.sayHello = function() {
        console.log('Hello, my name is', this.name);
    };
};

var luis = new Person('Luis', 12);

// 2nd way

var Person = function (name, age) {

    // Properties
    this.name = name;
    this.age = age;
};

// Methods
Person.prototype.sayHello = function() {
    console.log('Hello, my name is', this.name);
};

// Static method
Person.sayHello = function(){
    console.log('Hello, I am an static method');
};

var ana = new Person('Ana', 12);

