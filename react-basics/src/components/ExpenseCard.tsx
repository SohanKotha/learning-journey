interface ExpenseCardProps {
    id: number;
    title: string;
    amount: number;
    category: string;
    note?: string;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

function ExpenseCard({
    id,
    title,
    amount,
    category,
    note,
    onDelete,
    onUpdate
}: ExpenseCardProps) {

    return (
        <div className={amount > 100 ? "high-expense" : ""}>

            <h3>{title}</h3>

            <p>Amount: ${amount}</p>

            <p>Category: {category}</p>

            {note && <p>Note: {note}</p>}

            <button onClick={() => onUpdate(id)}>
                ✏️ Update
            </button>

            <button onClick={() => onDelete(id)}>
                ❌ Delete
            </button>

        </div>
    );
}

export default ExpenseCard;
