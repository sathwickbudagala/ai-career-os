import { useState } from 'react';
import './ResumeScore.css';

function ResumeScore() {
  const [items, setItems] = useState([
    { id: 1, category: 'Basics', text: 'Add a professional summary', completed: false },
    { id: 2, category: 'Basics', text: 'Include your contact information', completed: false },
    { id: 3, category: 'Basics', text: 'Add your education details', completed: false },
    { id: 4, category: 'Experience', text: 'List your work experience', completed: false },
    { id: 5, category: 'Experience', text: 'Use action verbs in descriptions', completed: false },
    { id: 6, category: 'Experience', text: 'Include measurable achievements', completed: false },
    { id: 7, category: 'Skills', text: 'List technical skills', completed: false },
    { id: 8, category: 'Skills', text: 'List soft skills', completed: false },
    { id: 9, category: 'Skills', text: 'Match skills to job description', completed: false },
    { id: 10, category: 'Extras', text: 'Add a projects section', completed: false },
    { id: 11, category: 'Extras', text: 'Include GitHub or portfolio link', completed: false },
    { id: 12, category: 'Extras', text: 'Add certifications or courses', completed: false },
  ]);

  function handleToggle(id) {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updated);
  }

  const completedCount = items.filter((item) => item.completed).length;
  const score = Math.round((completedCount / items.length) * 100);

  function getScoreColor() {
    if (score < 30) return '#c62828';
    if (score < 60) return '#e65100';
    if (score < 80) return '#1565c0';
    return '#2e7d32';
  }

  function getScoreMessage() {
    if (score < 30) return 'Your resume needs a lot of work. Start checking off the basics!';
    if (score < 60) return 'Good start! Keep completing more items to improve your score.';
    if (score < 80) return 'Looking good! A few more improvements and your resume will shine.';
    return 'Excellent! Your resume is strong and ready to impress recruiters!';
  }

  const categories = ['Basics', 'Experience', 'Skills', 'Extras'];

  return (
    <div className="resume-container">

      <h2>Resume Score</h2>
      <p>Check off completed items to calculate your resume strength</p>

      <div className="score-section">
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <span className="score-number" style={{ color: getScoreColor() }}>
            {score}
          </span>
          <span className="score-label">out of 100</span>
        </div>
        <div className="score-info">
          <h3 style={{ color: getScoreColor() }}>
            {score < 30 && 'Needs Work'}
            {score >= 30 && score < 60 && 'Getting There'}
            {score >= 60 && score < 80 && 'Looking Good'}
            {score >= 80 && 'Excellent!'}
          </h3>
          <p>{getScoreMessage()}</p>
          <div className="score-progress-container">
            <div
              className="score-progress-bar"
              style={{
                width: `${score}%`,
                background: getScoreColor(),
              }}
            ></div>
          </div>
          <p className="score-count">{completedCount} of {items.length} items completed</p>
        </div>
      </div>

      <div className="checklist">
        {categories.map((category) => (
          <div className="category-section" key={category}>
            <h3 className="category-title">{category}</h3>
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  className={`checklist-item ${item.completed ? 'completed' : ''}`}
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                >
                  <div className={`checkbox ${item.completed ? 'checked' : ''}`}>
                    {item.completed && '✓'}
                  </div>
                  <p className={item.completed ? 'done' : ''}>{item.text}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

    </div>
  );
}

export default ResumeScore;