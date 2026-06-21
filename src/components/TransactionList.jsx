import { useState } from 'react';
import { expenseCategories } from './TransactionForm';

export default function TransactionList({ transactions, onDelete, onEdit }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const sorted = [...filtered].reverse();

  return (
    <div className="page">
      <h2 className="page-title">Transactions</h2>

      <div className="filters">
        <div className="filter-group">
          <label>Type:</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Category:</label>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">All</option>
            {expenseCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <span className="filter-count">{sorted.length} transaction{sorted.length !== 1 ? 's' : ''}</span>
      </div>

      {sorted.length === 0 ? (
        <p className="empty-msg">No transactions match the selected filters.</p>
      ) : (
        <div className="tx-list">
          {sorted.map(t => (
            <div key={t.id} className="tx-item">
              <div className="tx-left">
                <div className={`tx-type-badge ${t.type}`}>
                  {t.type === 'income' ? '↑' : '↓'}
                </div>
                <div>
                  <div className="tx-desc">{t.description}</div>
                  <div className="tx-meta">
                    {t.type === 'expense' && <span className="tx-category">{t.category}</span>}
                    <span>{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <div className="tx-right">
                <div className={`tx-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                </div>
                <div className="tx-actions">
                  <button className="btn btn-sm btn-icon" onClick={() => onEdit(t)} title="Edit">✏️</button>
                  <button className="btn btn-sm btn-icon btn-danger-icon" onClick={() => onDelete(t.id)} title="Delete">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
