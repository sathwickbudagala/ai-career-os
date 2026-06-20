import './Navbar.css';

function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'applications', label: '📋 Applications' },
    { id: 'interviews', label: '📅 Interviews' },
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
      </div>

    </div>
  );
}

export default Navbar;