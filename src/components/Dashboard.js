import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">

      <div className="navbar">
        <h2>AI Career OS</h2>
        <p>Welcome back, Sathwick!</p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h3>45</h3>
          <p>Applications Sent</p>
        </div>

        <div className="stat-card">
          <h3>6</h3>
          <p>Interviews Scheduled</p>
        </div>

        <div className="stat-card">
          <h3>1</h3>
          <p>Offers Received</p>
        </div>

        <div className="stat-card">
          <h3>72%</h3>
          <p>Profile Strength</p>
        </div>

      </div>

      <div className="goal-container">
        <h3>Current Goal</h3>
        <p>Become a React Developer</p>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
        <p>72% Complete</p>
      </div>

    </div>
  );
}

export default Dashboard;