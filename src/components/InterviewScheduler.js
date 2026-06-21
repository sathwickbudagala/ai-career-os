import { useState, useEffect } from 'react';
import { getInterviews, addInterview, deleteInterview } from '../services/api';
import './InterviewScheduler.css';

function InterviewScheduler({ interviews, setInterviews }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Online');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const response = await getInterviews();
        setInterviews(response.data);
      } catch (error) {
        console.log('Error fetching interviews:', error);
      } finally {
        setFetching(false);
      }
    }
    fetchInterviews();
  // eslint-disable-next-line
  }, []);

  async function handleAdd() {
    if (company === '' || role === '' || date === '') {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await addInterview({ company, role, date, type });
      setInterviews([...interviews, response.data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      ));
      setCompany('');
      setRole('');
      setDate('');
      setType('Online');
    } catch (error) {
      alert('Error adding interview');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteInterview(id);
      setInterviews(interviews.filter((interview) => interview._id !== id));
    } catch (error) {
      alert('Error deleting interview');
    }
  }

  function isUpcoming(date) {
    return new Date(date) >= new Date();
  }

  if (fetching) {
    return <div className="loading-message">Loading your interviews...</div>;
  }

  return (
    <div className="scheduler-container">

      <h2>Interview Scheduler</h2>
      <p>Keep track of all your upcoming interviews</p>

      <div className="add-form">
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Online</option>
          <option>In Person</option>
          <option>Phone</option>
        </select>
        <button onClick={handleAdd} disabled={loading}>
          {loading ? 'Adding...' : 'Add Interview'}
        </button>
      </div>

      <div className="interviews-list">
        {interviews.length === 0 && (
          <p className="empty-message">No interviews scheduled yet. Add your first one above!</p>
        )}
        {interviews.map((interview) => (
          <div
            className={`interview-card ${isUpcoming(interview.date) ? 'upcoming' : 'past'}`}
            key={interview._id}
          >
            <div className="interview-left">
              <div className={`date-badge ${isUpcoming(interview.date) ? 'upcoming' : 'past'}`}>
                <span>{new Date(interview.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                <strong>{new Date(interview.date).toLocaleDateString('en-US', { day: '2-digit' })}</strong>
              </div>
            </div>
            <div className="interview-info">
              <h3>{interview.company}</h3>
              <p>{interview.role}</p>
              <span className="interview-type">{interview.type}</span>
            </div>
            <div className="interview-right">
              <span className={`upcoming-badge ${isUpcoming(interview.date) ? 'upcoming' : 'past'}`}>
                {isUpcoming(interview.date) ? 'Upcoming' : 'Past'}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDelete(interview._id)}
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

export default InterviewScheduler;