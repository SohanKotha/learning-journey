
 // lesson 3 - functions

function greet() {
    console.log("Hello Sohan");
}

greet();

// adding two numbers
function add(a, b) {
    return a + b;
}

console.log("Sum:", add(10, 20));

function checkNumber(num) {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(checkNumber(8));
console.log(checkNumber(7));

// arrow function
const multiply = (a, b) => {
    return a * b;
};

console.log("Multiply:", multiply(4, 5));

// shorter way
const square = (num) => num * num;

console.log("Square:", square(6));

// trying default parameter and return
function welcome(name = "Guest") {
    return `Welcome ${name}`;
}

console.log(welcome("Sohan"));
console.log(welcome());

// functions with arrays
const numbers = [2, 5, 8, 11, 14];

function printEvenNumbers(arr) {
    for (const number of arr) {
        if (number % 2 === 0) {
            console.log(number);
        }
    }
}

console.log("Even numbers:");
printEvenNumbers(numbers);

// checking if someone is an adult
const isAdult = (age) => {
    return age >= 18;
};

console.log(isAdult(25));
console.log(isAdult(16));

// grade based on score
const grade = (score) => {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "F";
    }
};

console.log("Grade:", grade(85));
console.log("Grade:", grade(65));

// finding biggest of three numbers
const maxOfThree = (a, b, c) => {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
};

console.log("Biggest number:", maxOfThree(10, 25, 15));

// checking return vs console.log
const result1 = add(2, 3);
console.log(result1);

const result2 = greet();
console.log(result2); // undefined because greet doesn't return anything
