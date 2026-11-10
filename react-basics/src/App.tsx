
import Header from "./components/header";
import ExpenseCard from "./components/ExpenseCard";
import Counter from "./components/Counter";

function App() {
    return (
        <div>
            <Header title="My Expense Tracker" />

            <p>Starting React with TypeScript</p>

            <ExpenseCard title="Groceries" amount={50} category="Food" />
            <ExpenseCard title="Uber" amount={20} category="Travel" />
            <ExpenseCard title="Pizza" amount={15} category="Food" note="Dinner" />

            <Counter />
        </div>
    );
}

export default App;
