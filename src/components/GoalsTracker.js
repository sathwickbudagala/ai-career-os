import { useState } from 'react';
import './GoalsTracker.css';

function GoalsTracker() {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState('');
  const [priority, setPriority] = useState('Medium');

  function handleAdd() {
    if (goalText === '') {
      alert('Please enter a goal');
      return;
    }

    const newGoal = {
      id: Date.now(),
      text: goalText,
      priority: priority,
      completed: false,
    };

    setGoals([...goals, newGoal]);
    setGoalText('');
    setPriority('Medium');
  }

  function handleToggle(id) {
    const updated = goals.map((goal) => {
      if (goal.id === id) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    });
    setGoals(updated);
  }

  function handleDelete(id) {
    const updated = goals.filter((goal) => goal.id !== id);
    setGoals(updated);
  }

  const completedCount = goals.filter((goal) => goal.completed).length;

  return (
    <div className="goals-container">

      <h2>Daily Goals</h2>
      <p>Set and track your daily career goals</p>

      {goals.length > 0 && (
        <div className="progress-summary">
          <p>{completedCount} of {goals.length} goals completed</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${(completedCount / goals.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="add-form">
        <input
          type="text"
          placeholder="Enter your goal e.g. Apply to 5 jobs today"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={handleAdd}>Add Goal</button>
      </div>

      {goals.length === 0 && (
        <p className="empty-message">No goals yet. Add your first goal above!</p>
      )}

      <div className="goals-list">
        {goals.map((goal) => (
          <div
            className={`goal-card ${goal.completed ? 'completed' : ''}`}
            key={goal.id}
          >

            <div className="goal-left">
              <div
                className={`checkbox ${goal.completed ? 'checked' : ''}`}
                onClick={() => handleToggle(goal.id)}
              >
                {goal.completed && '✓'}
              </div>
              <div>
                <p className={`goal-text ${goal.completed ? 'done' : ''}`}>
                  {goal.text}
                </p>
                <span className={`priority-badge ${goal.priority.toLowerCase()}`}>
                  {goal.priority} Priority
                </span>
              </div>
            </div>

            <button
              className="delete-button"
              onClick={() => handleDelete(goal.id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default GoalsTracker;