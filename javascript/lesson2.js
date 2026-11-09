
 // lesson 2 - conditions and loops

const marks = 82;

// checking grade
if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 80) {
    console.log("Grade B");
} else if (marks >= 70) {
    console.log("Grade C");
} else {
    console.log("Need to improve");
}

// trying == and ===
console.log(5 == "5");   // true
console.log(5 === "5");  // false

// == converts types if needed, === doesn't

console.log("--- for loop ---");

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

const subjects = ["JavaScript", "React", "SQL"];

console.log("--- subjects ---");

// going through the array
for (const subject of subjects) {
    console.log(subject);
}

// while loop countdown
console.log("--- while loop ---");

let num = 3;

while (num >= 1) {
    console.log(num);
    num--;
}

console.log("--- even numbers ---");

// print even numbers from 1 to 20
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// fizzbuzz practice
console.log("--- fizzbuzz ---");

for (let i = 1; i <= 15; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
