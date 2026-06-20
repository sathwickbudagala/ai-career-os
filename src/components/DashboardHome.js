import './DashboardHome.css';

function DashboardHome({ applications, interviews }) {
  const offers = applications.filter(
    (app) => app.status === 'Offer'
  ).length;

  const upcomingInterviews = interviews.filter(
    (interview) => new Date(interview.date) >= new Date()
  ).length;

  return (
    <div className="home-container">

      <div className="welcome-section">
        <h2>Welcome back, Sathwick! 👋</h2>
        <p>Here is your career progress at a glance</p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <h3>{applications.length}</h3>
          <p>Applications Sent</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <h3>{upcomingInterviews}</h3>
          <p>Upcoming Interviews</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <h3>{offers}</h3>
          <p>Offers Received</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <h3>{applications.length + interviews.length}</h3>
          <p>Total Activities</p>
        </div>

      </div>

      <div className="goal-container">
        <div className="goal-header">
          <h3>Current Goal</h3>
          <span>72%</span>
        </div>
        <p>Become a React Developer</p>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>

      <div className="summary-container">

        <div className="summary-card">
          <h3>Recent Applications</h3>
          {applications.length === 0 && (
            <p className="empty-message">No applications yet</p>
          )}
          {applications.slice(-3).reverse().map((app) => (
            <div className="summary-item" key={app.id}>
              <div>
                <p className="summary-company">{app.company}</p>
                <p className="summary-role">{app.role}</p>
              </div>
              <span className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <h3>Upcoming Interviews</h3>
          {interviews.filter((i) => new Date(i.date) >= new Date()).length === 0 && (
            <p className="empty-message">No upcoming interviews</p>
          )}
          {interviews
            .filter((i) => new Date(i.date) >= new Date())
            .slice(0, 3)
            .map((interview) => (
              <div className="summary-item" key={interview.id}>
                <div>
                  <p className="summary-company">{interview.company}</p>
                  <p className="summary-role">{interview.role}</p>
                </div>
                <span className="date-text">
                  {new Date(interview.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>
              </div>
            ))}
        </div>

      </div>

    </div>
  );
}

export default DashboardHome;