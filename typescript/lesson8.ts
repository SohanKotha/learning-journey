
 // lesson 8 - trying typescript

const myName: string = "Sohan";
let age: number = 26;
const graduated: boolean = true;

const skills: string[] = ["JavaScript", "React", "SQL"];

console.log(myName);
console.log(age);
console.log(graduated);
console.log(skills);

// changing age
age = 27;
console.log("Age now:", age);

// trying wrong type later
// age = "twenty";


 // trying interfaces with expenses

interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    note?: string;
}

// adding some expenses
const expenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 50, category: "Food" },
    { id: 2, title: "Uber", amount: 20, category: "Travel" },
    { id: 3, title: "Rent", amount: 800, category: "Rent" },
    { id: 4, title: "Pizza", amount: 15, category: "Food", note: "Dinner" }
];

console.log("My expenses:", expenses);

// getting the first expense
console.log(expenses[0].title);
console.log(expenses[0].amount);

// calculating total amount
const getTotal = (expenses: Expense[]): number => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
};

console.log("Total amount:", getTotal(expenses));

// getting expenses by category
const getByCategory = (expenses: Expense[], category: string): Expense[] => {
    return expenses.filter((e) => e.category === category);
};

const foodExpenses = getByCategory(expenses, "Food");

console.log("Food expenses:", foodExpenses);
console.log("Food total:", getTotal(foodExpenses));


 // trying task status types

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
    id: number;
    title: string;
    status: TaskStatus;
    assignedTo?: string;
}

// adding some tasks
const tasks: Task[] = [
    { id: 1, title: "Learn TypeScript", status: "done" },
    { id: 2, title: "Practice React", status: "todo", assignedTo: "Sohan" },
    { id: 3, title: "Learn C#", status: "todo" },
    { id: 4, title: "Build an API", status: "in-progress" }
];

console.log("Tasks:", tasks);

// counting tasks based on status
const countByStatus = (tasks: Task[], status: TaskStatus): number => {
    return tasks.filter((task) => task.status === status).length;
};

console.log("Todo:", countByStatus(tasks, "todo"));
console.log("In progress:", countByStatus(tasks, "in-progress"));
console.log("Done:", countByStatus(tasks, "done"));

// errors i tried while learning typescript

// amount: "fifty" gave TS2322 because amount should be a number

// status: "finished" gave TS2322 because its not in TaskStatus

// removing amount from pizza gave an error because amount is required



 // trying to fetch users with typescript

interface User {
    id: number;
    name: string;
    email: string;
}

const getUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Could not get users");
    }

    const users: User[] = await response.json();
    return users;
};

// printing first user
const showUsers = async () => {
    try {
        const users = await getUsers();
        console.log("First user:", users[0].name);
    } catch (error) {
        console.log("Error getting users:", error);
    }
};

showUsers();
