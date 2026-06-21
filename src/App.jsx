import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Analytics from './components/Analytics';
import './styles/App.css';

const sampleData = [
  { id: '1', description: 'Salary', amount: 4500, type: 'income', category: '—', date: '2026-06-01' },
  { id: '2', description: 'Groceries', amount: 120, type: 'expense', category: 'Food', date: '2026-06-02' },
  { id: '3', description: 'Uber ride', amount: 25, type: 'expense', category: 'Transport', date: '2026-06-03' },
  { id: '4', description: 'New shoes', amount: 80, type: 'expense', category: 'Shopping', date: '2026-06-04' },
  { id: '5', description: 'Electricity bill', amount: 95, type: 'expense', category: 'Bills', date: '2026-06-05' },
  { id: '6', description: 'Netflix', amount: 15, type: 'expense', category: 'Entertainment', date: '2026-06-06' },
  { id: '7', description: 'Gym membership', amount: 50, type: 'expense', category: 'Health', date: '2026-06-07' },
  { id: '8', description: 'Online course', amount: 200, type: 'expense', category: 'Education', date: '2026-06-08' },
  { id: '9', description: 'Freelance project', amount: 800, type: 'income', category: '—', date: '2026-06-10' },
  { id: '10', description: 'Dinner out', amount: 45, type: 'expense', category: 'Food', date: '2026-06-11' },
];

function loadTransactions() {
  const stored = localStorage.getItem('financeTransactions');
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  return sampleData;
}

export default function App() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editTx, setEditTx] = useState(null);

  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  function handleSubmit(data) {
    setTransactions(prev => {
      const exists = prev.find(t => t.id === data.id);
      if (exists) {
        return prev.map(t => (t.id === data.id ? data : t));
      }
      return [...prev, data];
    });
    setEditTx(null);
    setActiveTab('transactions');
  }

  function handleDelete(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (editTx?.id === id) setEditTx(null);
  }

  function handleEdit(tx) {
    setEditTx(tx);
    setActiveTab('add');
  }

  function renderPage() {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'add':
        return <TransactionForm onSubmit={handleSubmit} editTx={editTx} />;
      case 'transactions':
        return (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        );
      case 'analytics':
        return <Analytics transactions={transactions} />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  }

  return (
    <div className="app-layout">
      <Navbar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setEditTx(null); }} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
