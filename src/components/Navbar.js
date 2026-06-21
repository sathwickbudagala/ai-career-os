import './Navbar.css';

function Navbar({ activePage, setActivePage, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'applications', label: '📋 Applications' },
    { id: 'interviews', label: '📅 Interviews' },
    { id: 'skills', label: '💡 Skills' },
    { id: 'goals', label: '🎯 Goals' },
    { id: 'resume', label: '📄 Resume Score' },
    { id: 'ai', label: '🤖 AI Assistant' },
  ];

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h2>AI Career OS</h2>
        <p>Your personal career dashboard</p>
      </div>
      <div className="navbar-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-button ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button className="logout-button" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;