import { useState } from 'react';
import './ApplicationTracker.css';

function ApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');

  function handleAdd() {
    if (company === '' || role === '') {
      alert('Please enter company and role');
      return;
    }

    const newApplication = {
      id: Date.now(),
      company: company,
      role: role,
      status: status,
    };

    setApplications([...applications, newApplication]);
    setCompany('');
    setRole('');
    setStatus('Applied');
  }

  function handleDelete(id) {
    const updated = applications.filter((app) => app.id !== id);
    setApplications(updated);
  }

  return (
    <div className="tracker-container">

      <h2>Application Tracker</h2>
      <p>Track all your job applications in one place</p>

      <div className="add-form">

        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role applied for"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button onClick={handleAdd}>Add Application</button>

      </div>

      <div className="applications-list">

        {applications.length === 0 && (
          <p className="empty-message">No applications yet. Add your first one above!</p>
        )}

        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="app-info">
              <h3>{app.company}</h3>
              <p>{app.role}</p>
            </div>
            <div className="app-right">
              <span className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDelete(app.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ApplicationTracker;