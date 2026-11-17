
import { useState } from "react";
import type { Expense } from "./type";

import Header from "./components/Header";
import ExpenseCard from "./components/ExpenseCard";
import Counter from "./components/Counter";

function App() {

    // keeping expenses in state
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, title: "Groceries", amount: 50, category: "Food" },
        { id: 2, title: "Uber", amount: 20, category: "Travel" },
        { id: 3, title: "Pizza", amount: 15, category: "Food", note: "Dinner" },
        { id: 4, title: "Shoes", amount: 80, category: "Shopping" },
        { id: 5, title: "Bus Ticket", amount: 10, category: "Travel" },
        { id: 6, title: "Jacket", amount: 120, category: "Shopping" }
    ]);

    // selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // deleting an expense
    const deleteExpense = (id: number) => {
        setExpenses((current) =>
            current.filter((e) => e.id !== id)
        );
    };

    // updating an expense
    const updateExpense = (id: number) => {

        const expense = expenses.find((e) => e.id === id);

        if (!expense) return;

        const newTitle = prompt("Enter expense name:", expense.title);

        if (newTitle === null || newTitle.trim() === "") return;

        const amountInput = prompt("Enter amount:", String(expense.amount));

        if (amountInput === null) return;

        const newAmount = Number(amountInput);

        if (amountInput.trim() === "" || !Number.isFinite(newAmount) || newAmount < 0) {
            alert("Please enter a valid amount");
            return;
        }

        setExpenses((current) =>
            current.map((e) =>
                e.id === id
                    ? { ...e, title: newTitle.trim(), amount: newAmount }
                    : e
            )
        );
    };

    // total of all expenses
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    // filtering based on category
    const filteredExpenses = selectedCategory === "All"
        ? expenses
        : expenses.filter((e) => e.category === selectedCategory);

    return (
        <div>
            <Header title="My Expense Tracker" />

            <p>Starting React with TypeScript</p>

            <h2>Total Expenses: ${total}</h2>

            <div>
                <button onClick={() => setSelectedCategory("All")}>
                    All
                </button>

                <button onClick={() => setSelectedCategory("Food")}>
                    Food
                </button>

                <button onClick={() => setSelectedCategory("Travel")}>
                    Travel
                </button>

                <button onClick={() => setSelectedCategory("Shopping")}>
                    Shopping
                </button>
            </div>

            {filteredExpenses.length === 0 ? (
                <p>
                    {expenses.length === 0
                        ? "No expenses yet"
                        : "No expenses in this category"}
                </p>
            ) : (
                filteredExpenses.map((e) => (
                    <ExpenseCard
                        key={e.id}
                        id={e.id}
                        title={e.title}
                        amount={e.amount}
                        category={e.category}
                        note={e.note}
                        onUpdate={updateExpense}
                        onDelete={deleteExpense}
                    />
                ))
            )}

            <Counter />
        </div>
    );
}

export default App;
