class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My names is ${this.name} and I am ${this.age}`);
    }
}

module.exports = Person;
