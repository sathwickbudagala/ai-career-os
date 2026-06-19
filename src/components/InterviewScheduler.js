import { useState, useEffect } from 'react';
import './InterviewScheduler.css';

function InterviewScheduler({ interviews, setInterviews }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Online');
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const sortedList = [...interviews].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setSorted(sortedList);
  }, [interviews]);

  function handleAdd() {
    if (company === '' || role === '' || date === '') {
      alert('Please fill in all fields');
      return;
    }

    const newInterview = {
      id: Date.now(),
      company: company,
      role: role,
      date: date,
      type: type,
    };

    setInterviews([...interviews, newInterview]);
    setCompany('');
    setRole('');
    setDate('');
    setType('Online');
  }

  function handleDelete(id) {
    const updated = interviews.filter((interview) => interview.id !== id);
    setInterviews(updated);
  }

  function isUpcoming(date) {
    return new Date(date) >= new Date();
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

        <button onClick={handleAdd}>Add Interview</button>

      </div>

      <div className="interviews-list">

        {sorted.length === 0 && (
          <p className="empty-message">No interviews scheduled yet. Add your first one above!</p>
        )}

        {sorted.map((interview) => (
          <div
            className={`interview-card ${isUpcoming(interview.date) ? 'upcoming' : 'past'}`}
            key={interview.id}
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
                onClick={() => handleDelete(interview.id)}
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