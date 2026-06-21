export default function Dashboard({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;
  const recent = [...transactions].reverse().slice(0, 5);

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>
      <div className="cards">
        <div className="card card-balance">
          <div className="card-label">Current Balance</div>
          <div className="card-value">${balance.toFixed(2)}</div>
          <div className="card-icon">💰</div>
        </div>
        <div className="card card-income">
          <div className="card-label">Total Income</div>
          <div className="card-value">${totalIncome.toFixed(2)}</div>
          <div className="card-icon">📈</div>
        </div>
        <div className="card card-expense">
          <div className="card-label">Total Expenses</div>
          <div className="card-value">${totalExpense.toFixed(2)}</div>
          <div className="card-icon">📉</div>
        </div>
      </div>

      <div className="section">
        <h3>Recent Transactions</h3>
        {recent.length === 0 ? (
          <p className="empty-msg">No transactions yet. Start by adding one!</p>
        ) : (
          <div className="recent-list">
            {recent.map(t => (
              <div key={t.id} className="recent-item">
                <div>
                  <div className="recent-desc">{t.description}</div>
                  <div className="recent-meta">{t.category} &middot; {new Date(t.date).toLocaleDateString()}</div>
                </div>
                <div className={`recent-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
