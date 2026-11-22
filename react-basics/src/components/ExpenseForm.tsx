import { useState } from "react";
import type { FormEvent } from "react";
import type { Expense } from "../type";

interface ExpenseFormProps {
    onAdd: (expense: Expense) => void;
}

function ExpenseForm({ onAdd }: ExpenseFormProps) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (title.trim() === "") {
            setError("Please enter expense name");
            return;
        }

        const expenseAmount = Number(amount);

        if (amount.trim() === "" || !Number.isFinite(expenseAmount) || expenseAmount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        const newExpense: Expense = {
            id: Date.now(),
            title: title.trim(),
            amount: expenseAmount,
            category: category,
            note: note.trim()
        };

        onAdd(newExpense);

        // clearing the form
        setTitle("");
        setAmount("");
        setCategory("Food");
        setNote("");
        setError("");
    };

    return (
        <div>
            <h2>Add New Expense</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="expense-title">Expense Name: </label>

                    <input
                        id="expense-title"
                        type="text"
                        placeholder="Enter expense name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label htmlFor="expense-amount">Amount: </label>

                    <input
                        id="expense-amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label htmlFor="expense-category">Category: </label>

                    <select
                        id="expense-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>

                <br />

                <div>
                    <label htmlFor="expense-note">Note: </label>

                    <input
                        id="expense-note"
                        type="text"
                        placeholder="Optional note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <br />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">➕ Add Expense</button>

            </form>
        </div>
    );
}

export default ExpenseForm;