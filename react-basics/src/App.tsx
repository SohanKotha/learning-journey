import { useState } from "react";
import type { Expense } from "./type";

import Header from "./components/Header";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseForm from "./components/ExpenseForm";
import Counter from "./components/Counter";
import UserList from "./components/UserList";
import Clock from "./components/Clock";

function App() {

    // expenses data
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, title: "Groceries", amount: 50, category: "Food" },
        { id: 2, title: "Uber", amount: 20, category: "Travel" },
        { id: 3, title: "Pizza", amount: 15, category: "Food", note: "Dinner" },
        { id: 4, title: "Shoes", amount: 80, category: "Shopping" },
        { id: 5, title: "Bus Ticket", amount: 10, category: "Travel" },
        { id: 6, title: "Jacket", amount: 120, category: "Shopping" }
    ]);

    // category filter
    const [selectedCategory, setSelectedCategory] = useState("All");

    // adding an expense
    const addExpense = (expense: Expense) => {

        setExpenses((current) => [...current, expense]);

        setSelectedCategory("All");
    };

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

        if (newTitle === null || newTitle.trim() === "") {
            return;
        }

        const amountInput = prompt(
            "Enter amount:",
            String(expense.amount)
        );

        if (amountInput === null) return;

        const newAmount = Number(amountInput);

        if (
            amountInput.trim() === "" ||
            !Number.isFinite(newAmount) ||
            newAmount < 0
        ) {
            alert("Please enter a valid amount");
            return;
        }

        setExpenses((current) =>
            current.map((e) =>
                e.id === id
                    ? {
                        ...e,
                        title: newTitle.trim(),
                        amount: newAmount
                    }
                    : e
            )
        );
    };

    // calculating total
    const total = expenses.reduce(
        (sum, e) => sum + e.amount,
        0
    );

    // filtering expenses
    const filteredExpenses =
        selectedCategory === "All"
            ? expenses
            : expenses.filter(
                (e) => e.category === selectedCategory
            );

    return (
        <div>

            <Header title="My Expense Tracker" />

            <p>Starting React with TypeScript</p>

            <Clock />

            <UserList />

            <hr />

            <ExpenseForm onAdd={addExpense} />

            <hr />

            <h2>Total Expenses: ${total.toFixed(2)}</h2>

            <h2>My Expenses</h2>

            <div>
                {["All", "Food", "Travel", "Shopping", "Rent"].map(
                    (category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                backgroundColor:
                                    selectedCategory === category
                                        ? "lightblue"
                                        : "white"
                            }}
                        >
                            {category}
                        </button>
                    )
                )}
            </div>

            {filteredExpenses.length === 0 ? (

                <p>
                    {expenses.length === 0
                        ? "No expenses yet 🎉"
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

            <hr />

            <Counter />

        </div>
    );
}

export default App;