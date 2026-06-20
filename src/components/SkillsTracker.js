import { useState } from 'react';
import './SkillsTracker.css';

function SkillsTracker() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState('');
  const [progress, setProgress] = useState(50);
  const [category, setCategory] = useState('Frontend');

  function handleAdd() {
    if (skillName === '') {
      alert('Please enter a skill name');
      return;
    }

    const newSkill = {
      id: Date.now(),
      name: skillName,
      progress: progress,
      category: category,
    };

    setSkills([...skills, newSkill]);
    setSkillName('');
    setProgress(50);
    setCategory('Frontend');
  }

  function handleDelete(id) {
    const updated = skills.filter((skill) => skill.id !== id);
    setSkills(updated);
  }

  function getProgressColor(progress) {
    if (progress < 30) return '#c62828';
    if (progress < 60) return '#e65100';
    if (progress < 80) return '#1565c0';
    return '#2e7d32';
  }

  return (
    <div className="skills-container">

      <h2>Skills Tracker</h2>
      <p>Track your learning progress for each skill</p>

      <div className="add-form">

        <input
          type="text"
          placeholder="Skill name e.g. React, Python"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>DevOps</option>
          <option>Soft Skills</option>
        </select>

        <div className="slider-group">
          <label>Progress: {progress}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </div>

        <button onClick={handleAdd}>Add Skill</button>

      </div>

      {skills.length === 0 && (
        <p className="empty-message">No skills added yet. Add your first skill above!</p>
      )}

      <div className="skills-list">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.id}>

            <div className="skill-header">
              <div>
                <h3>{skill.name}</h3>
                <span className="category-badge">{skill.category}</span>
              </div>
              <div className="skill-right">
                <span
                  className="progress-text"
                  style={{ color: getProgressColor(skill.progress) }}
                >
                  {skill.progress}%
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${skill.progress}%`,
                  background: getProgressColor(skill.progress),
                }}
              ></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default SkillsTracker;