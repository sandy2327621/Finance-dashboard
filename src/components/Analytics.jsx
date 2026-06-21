import CategorySummary from './CategorySummary';

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel(key) {
  const [y, m] = key.split('-');
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function Analytics({ transactions }) {
  const now = new Date();
  const currentMonth = getMonthKey(now.toISOString().split('T')[0]);

  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  const totalIncome = incomes.reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = expenses.reduce((s, t) => s + Number(t.amount), 0);

  const currentMonthExpenses = expenses.filter(t => getMonthKey(t.date) === currentMonth);
  const currentMonthIncome = incomes.filter(t => getMonthKey(t.date) === currentMonth);

  const monthExpenseTotal = currentMonthExpenses.reduce((s, t) => s + Number(t.amount), 0);
  const monthIncomeTotal = currentMonthIncome.reduce((s, t) => s + Number(t.amount), 0);

  const monthlyMap = {};
  transactions.forEach(t => {
    const key = getMonthKey(t.date);
    if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0 };
    monthlyMap[key][t.type] += Number(t.amount);
  });

  const monthlyKeys = Object.keys(monthlyMap).sort();

  return (
    <div className="page">
      <h2 className="page-title">Analytics</h2>

      <div className="cards">
        <div className="card card-income">
          <div className="card-label">This Month Income</div>
          <div className="card-value">${monthIncomeTotal.toFixed(2)}</div>
          <div className="card-icon">📈</div>
        </div>
        <div className="card card-expense">
          <div className="card-label">This Month Expenses</div>
          <div className="card-value">${monthExpenseTotal.toFixed(2)}</div>
          <div className="card-icon">📉</div>
        </div>
        <div className="card card-balance">
          <div className="card-label">This Month Savings</div>
          <div className="card-value">${(monthIncomeTotal - monthExpenseTotal).toFixed(2)}</div>
          <div className="card-icon">💎</div>
        </div>
      </div>

      <div className="section">
        <h3>Monthly Summary</h3>
        {monthlyKeys.length === 0 ? (
          <p className="empty-msg">No data yet.</p>
        ) : (
          <div className="monthly-list">
            {[...monthlyKeys].reverse().map(key => {
              const m = monthlyMap[key];
              return (
                <div key={key} className="monthly-item">
                  <div className="monthly-label">{getMonthLabel(key)}</div>
                  <div className="monthly-bars">
                    <div className="monthly-bar-row">
                      <span className="bar-label">Income</span>
                      <div className="bar-track">
                        <div className="bar-fill income-bar" style={{ width: `${m.income > 0 ? Math.min((m.income / (m.income + m.expense || 1)) * 100, 100) : 0}%` }} />
                      </div>
                      <span className="bar-value">+${m.income.toFixed(0)}</span>
                    </div>
                    <div className="monthly-bar-row">
                      <span className="bar-label">Expense</span>
                      <div className="bar-track">
                        <div className="bar-fill expense-bar" style={{ width: `${m.expense > 0 ? Math.min((m.expense / (m.income + m.expense || 1)) * 100, 100) : 0}%` }} />
                      </div>
                      <span className="bar-value">-${m.expense.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CategorySummary transactions={transactions} />

      <div className="section">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value">{transactions.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">${totalIncome.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">${totalExpense.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Net Balance</div>
            <div className="stat-value">${(totalIncome - totalExpense).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
