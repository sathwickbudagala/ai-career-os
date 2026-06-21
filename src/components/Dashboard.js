import { useState } from 'react';
import './Dashboard.css';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import ApplicationTracker from './ApplicationTracker';
import InterviewScheduler from './InterviewScheduler';
import SkillsTracker from './SkillsTracker';
import GoalsTracker from './GoalsTracker';
import ResumeScore from './ResumeScore';
import Footer from './Footer';

function Dashboard({ user, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="dashboard-container">

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
      />

      {activePage === 'dashboard' && (
        <DashboardHome
          applications={applications}
          interviews={interviews}
          user={user}
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

      {activePage === 'goals' && (
        <GoalsTracker />
      )}

      {activePage === 'resume' && (
        <ResumeScore />
      )}

      <Footer />

    </div>
  );
}

export default Dashboard;