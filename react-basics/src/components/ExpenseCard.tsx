
 // trying props with expense card

interface ExpenseCardProps {
    title: string;
    amount: number;
    category: string;
    note?: string;
}

function ExpenseCard({ title, amount, category, note }: ExpenseCardProps) {
    return (
        <div>
            <h3>{title}</h3>
            <p>Amount: ${amount}</p>
            <p>Category: {category}</p>
            {note && <p>Note: {note}</p>}
        </div>
    );
}

export default ExpenseCard;

