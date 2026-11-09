// lesson 1 - variables and data types

const myName = "Sohan";
let age = 25;
const college = "UT Arlington";

age = 26; // changed the age

let graduated = true;

// some skills i want to learn
let skills = ["React", "C#", "SQL Server"];

console.log(myName);
console.log(age);
console.log(college);

// checking what types these are
console.log(typeof myName);
console.log(typeof age);
console.log(typeof graduated);

console.log(skills);
console.log(skills[0]); // first value in array

// trying objects now
const student = {
    name: myName,
    age: age,
    college: college,
    graduated: graduated,
    skills: skills
};

console.log(student);

// access a value from the object
console.log(student.name);
console.log(student.college);

// typeof array gives object?
console.log(typeof skills);
console.log(typeof student);
console.log(Array.isArray(skills));

// trying out template strings
console.log(`Hi, my name is ${myName}`);
console.log(`I'm learning ${skills.length} skills`);

// const should not allow reassignment
// myName = "John";
// error: TypeError: Assignment to constant variable (line 51)

