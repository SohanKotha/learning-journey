
 // lesson 6 - async and fetch

import { getUsers as getUsersFromApi } from "./api.js";
console.log("1. Start");

setTimeout(() => {
    console.log("2. After 2 seconds");
}, 2000);

console.log("3. End");

// output comes as 1, 3, 2
// because setTimeout runs later and js continues with the next line



 // step 2 - trying promises

const checkMarks = (marks) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (marks >= 40) {
                resolve("Pass");
            } else {
                reject("Fail");
            }
        }, 1000);
    });
};

// using then and catch
checkMarks(75)
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((error) => {
        console.log("Error:", error);
    });

// now trying async await
const testMarks = async () => {
    try {
        const result = await checkMarks(30);
        console.log("Result:", result);
    } catch (error) {
        console.log("Result:", error);
    }
};

testMarks();


 // step 3 - getting users from an api

const getUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Could not get users");
        }

        const users = await response.json();

        console.log("Total users:", users.length);

        // get all names
        const names = users.map((user) => user.name);
        console.log("Names:", names);

        // finding user with id 5
        const user5 = users.find((user) => user.id === 5);
        console.log("User 5:", user5);

        // emails ending with .biz
        const bizUsers = users.filter((user) => user.email.endsWith(".biz"));
        console.log("Biz users:", bizUsers);

    } catch (error) {
        console.log("Error:", error.message);
    }
};

getUsers();



 // step 4 - checking what happens with wrong url

const testWrongUrl = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/wrongpath");

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Could not load data:", error.message);
    }
};

testWrongUrl();



 
 // checking if import works

try {
    const users = await getUsersFromApi();
    console.log("Users from api.js:", users.length);
} catch (error) {
    console.log("Error:", error.message);
}
