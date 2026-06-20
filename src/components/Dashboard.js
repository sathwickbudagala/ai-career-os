import { useState } from 'react';
import './Dashboard.css';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import ApplicationTracker from './ApplicationTracker';
import InterviewScheduler from './InterviewScheduler';
import SkillsTracker from './SkillsTracker';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="dashboard-container">

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {activePage === 'dashboard' && (
        <DashboardHome
          applications={applications}
          interviews={interviews}
        />
      )}

      {activePage === 'applications' && (
        <ApplicationTracker
          applications={applications}
          setApplications={setApplications}
        />
      )}

      {activePage === 'interviews' && (
        <InterviewScheduler
          interviews={interviews}
          setInterviews={setInterviews}
        />
      )}

      {activePage === 'skills' && (
        <SkillsTracker />
      )}

    </div>
  );
}

export default Dashboard;