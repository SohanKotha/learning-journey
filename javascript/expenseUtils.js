
 // some functions for expenses

export const getTotal = (expenses) => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
};

// get expenses from one category
export const getByCategory = (expenses, category) => {
    return expenses.filter((e) => e.category === category);
};
