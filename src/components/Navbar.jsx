import { useState } from 'react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'add', label: 'Add Transaction', icon: '➕' },
  { key: 'transactions', label: 'Transactions', icon: '💳' },
  { key: 'analytics', label: 'Analytics', icon: '📈' },
];

export default function Navbar({ activeTab, onTabChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>
      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-icon">💰</span>
          <span className="brand-text">ExpenseTracker</span>
        </div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.key}>
              <button
                className={`nav-btn ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => { onTabChange(item.key); setOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
