import { useState, useEffect } from 'react';

const expenseCategories = [
  'Food', 'Transport', 'Shopping', 'Bills',
  'Entertainment', 'Health', 'Education', 'Other',
];

const defaultForm = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionForm({ onSubmit, editTx }) {
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editTx) {
      setForm({
        description: editTx.description,
        amount: editTx.amount,
        type: editTx.type,
        category: editTx.category || 'Other',
        date: editTx.date,
      });
    } else {
      setForm(defaultForm);
    }
  }, [editTx]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim()) return alert('Please enter a description.');
    if (!form.amount || Number(form.amount) <= 0) return alert('Please enter a valid amount.');

    onSubmit({
      id: editTx ? editTx.id : Date.now().toString(),
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.type === 'expense' ? form.category : '—',
      date: form.date,
    });

    setForm(defaultForm);
    setMessage(editTx ? 'Transaction updated!' : 'Transaction added!');
    setTimeout(() => setMessage(''), 2500);
  }

  return (
    <div className="page">
      <h2 className="page-title">{editTx ? 'Edit Transaction' : 'Add Transaction'}</h2>

      {message && <div className="toast">{message}</div>}

      <form className="tx-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {form.type === 'expense' && (
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {expenseCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editTx ? '✏️ Update' : '➕ Add'}
        </button>
      </form>
    </div>
  );
}

export { expenseCategories };
