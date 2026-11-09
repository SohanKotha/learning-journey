
 // lesson 4 - array methods

const expenses = [
    { id: 1, title: "Groceries", amount: 50, category: "Food" },
    { id: 2, title: "Uber", amount: 20, category: "Travel" },
    { id: 3, title: "Pizza", amount: 15, category: "Food" },
    { id: 4, title: "Rent", amount: 800, category: "Rent" },
    { id: 5, title: "Shoes", amount: 60, category: "Shopping" },
    { id: 6, title: "Bus", amount: 10, category: "Travel" }
];

console.log("Total expenses:", expenses.length);

// trying map to get titles
const titles = expenses.map((e) => e.title);
console.log("Titles:", titles);

// showing title with amount
const details = expenses.map((e) => `${e.title} - $${e.amount}`);
console.log(details);

// filter expenses above 30
const expensiveItems = expenses.filter((e) => e.amount > 30);
console.log("Above $30:", expensiveItems);

// only food expenses
const food = expenses.filter((e) => e.category === "Food");
console.log("Food:", food);

// find expense by id
const item = expenses.find((e) => e.id === 3);
console.log("Found:", item);

// what happens if id is not there?
const missing = expenses.find((e) => e.id === 10);
console.log("Missing id:", missing);

// adding all amounts using reduce
const total = expenses.reduce((sum, e) => sum + e.amount, 0);
console.log("Total amount:", total);

// filter and reduce together
const foodTotal = expenses
    .filter((e) => e.category === "Food")
    .reduce((sum, e) => sum + e.amount, 0);

console.log("Food total:", foodTotal);

// checking the original array
console.log("Original expenses:", expenses);
