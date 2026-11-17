// expense details

export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    note?: string;
}