import { expenseCategories } from './TransactionForm';

export default function CategorySummary({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((s, t) => s + Number(t.amount), 0);

  const categoryTotals = expenseCategories.map(cat => {
    const total = expenses
      .filter(t => t.category === cat)
      .reduce((s, t) => s + Number(t.amount), 0);
    const pct = totalExpense > 0 ? (total / totalExpense) * 100 : 0;
    return { category: cat, total, pct };
  });

  const highest = categoryTotals.reduce((a, b) => (a.total > b.total ? a : b), categoryTotals[0]);

  return (
    <div className="section">
      <h3>Category Breakdown</h3>
      <div className="category-grid">
        {categoryTotals.map(({ category, total, pct }) => (
          <div key={category} className="category-card">
            <div className="cat-header">
              <span className="cat-name">{category}</span>
              <span className="cat-amount">${total.toFixed(2)}</span>
            </div>
            <div className="cat-bar-bg">
              <div
                className="cat-bar-fill"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="cat-pct">{pct.toFixed(1)}%</div>
          </div>
        ))}
      </div>

      {totalExpense > 0 && (
        <div className="highest-category">
          Highest spending category: <strong>{highest.category}</strong> (${highest.total.toFixed(2)})
        </div>
      )}
    </div>
  );
}
