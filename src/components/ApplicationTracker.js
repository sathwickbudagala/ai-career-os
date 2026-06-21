import { useState, useEffect } from 'react';
import { getApplications, addApplication, deleteApplication, updateApplication } from '../services/api';
import './ApplicationTracker.css';

function ApplicationTracker({ applications, setApplications }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await getApplications();
        setApplications(response.data);
      } catch (error) {
        console.log('Error fetching applications:', error);
      } finally {
        setFetching(false);
      }
    }
    fetchApplications();
  // eslint-disable-next-line
  }, []);

  async function handleAdd() {
    if (company === '' || role === '') {
      alert('Please enter company and role');
      return;
    }

    setLoading(true);
    try {
      const response = await addApplication({ company, role, status });
      setApplications([response.data, ...applications]);
      setCompany('');
      setRole('');
      setStatus('Applied');
    } catch (error) {
      alert('Error adding application');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      alert('Error deleting application');
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      const response = await updateApplication(id, { status: newStatus });
      setApplications(applications.map((app) =>
        app._id === id ? response.data : app
      ));
    } catch (error) {
      alert('Error updating application');
    }
  }

  if (fetching) {
    return <div className="loading-message">Loading your applications...</div>;
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
        <button onClick={handleAdd} disabled={loading}>
          {loading ? 'Adding...' : 'Add Application'}
        </button>
      </div>

      <div className="applications-list">
        {applications.length === 0 && (
          <p className="empty-message">No applications yet. Add your first one above!</p>
        )}
        {applications.map((app) => (
          <div className="application-card" key={app._id}>
            <div className="app-info">
              <h3>{app.company}</h3>
              <p>{app.role}</p>
            </div>
            <div className="app-right">
              <select
                className={`status-select ${app.status.toLowerCase()}`}
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <button
                className="delete-button"
                onClick={() => handleDelete(app._id)}
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