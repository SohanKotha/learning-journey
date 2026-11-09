
 // lesson 5 - objects and spread

import { getTotal, getByCategory } from "./expenseUtils.js";

const student = {
    name: "Sohan",
    age: 25,
    college: "UT Arlington",
    skills: ["JavaScript", "React", "SQL"]
};

console.log(student);

// adding email and changing age
student.email = "sohan@example.com";
student.age = 26;

console.log(Object.keys(student));

// getting name and college
const { name, college } = student;

console.log(name);
console.log(college);

// trying array destructuring
const [first, second] = student.skills;

console.log(first);
console.log(second);

// passing object to function
const introduce = ({ name, age }) => {
    return `My name is ${name} and I'm ${age} years old`;
};

console.log(introduce(student));

// trying spread with objects
const updatedStudent = {
    ...student,
    city: "Arlington"
};

console.log("Original student:", student);
console.log("Updated student:", updatedStudent);

// adding one more skill without changing old array
const newSkills = [...student.skills, "C#"];

console.log("Old skills:", student.skills);
console.log("New skills:", newSkills);

// checking expense functions from another file
const expenses = [
    { id: 1, title: "Groceries", amount: 50, category: "Food" },
    { id: 2, title: "Uber", amount: 20, category: "Travel" },
    { id: 3, title: "Pizza", amount: 15, category: "Food" },
    { id: 4, title: "Shoes", amount: 60, category: "Shopping" }
];

console.log("All expenses:", expenses);

const total = getTotal(expenses);
console.log("Total amount:", total);

const food = getByCategory(expenses, "Food");
console.log("Food expenses:", food);

// using both functions together
console.log("Food total:", getTotal(food));

// checking what happens when we just assign an object
const original = { age: 26 };
const copy = original;

copy.age = 30;

console.log("Copy age:", copy.age);
console.log("Original age:", original.age);
