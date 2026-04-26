import React, { useState } from 'react';
import './TasksPanel.css';

function TasksPanel({ tasks }) {
  const [submitted, setSubmitted] = useState({});
  const [proof, setProof] = useState({});

  const handleSubmit = (taskId) => {
    if (!proof[taskId]?.trim()) return;
    setSubmitted(prev => ({ ...prev, [taskId]: true }));
  };

  const typeClass = { referral: 'tag-referral', promotion: 'tag-promotion', content: 'tag-content', engagement: 'tag-engagement' };

  return (
    <div className="tasks-panel">
      <div className="tasks-header">
        <h2>📋 My Tasks</h2>
        <p>Complete tasks to earn points and climb the leaderboard</p>
      </div>

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${submitted[task.id] ? 'task-done' : ''}`}>
            <div className="task-top">
              <span className={`badge-pill ${typeClass[task.type] || 'tag-referral'}`}>{task.type}</span>
              <span className="task-points">+{task.points} pts</span>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>
            <div className="task-deadline">📅 Due: {new Date(task.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>

            {submitted[task.id] ? (
              <div className="task-submitted">✅ Submitted — Pending Verification</div>
            ) : (
              <div className="task-submit">
                <input
                  type="text"
                  placeholder="Paste proof link (LinkedIn, GitHub, etc.)"
                  value={proof[task.id] || ''}
                  onChange={e => setProof(prev => ({ ...prev, [task.id]: e.target.value }))}
                />
                <button
                  className="btn btn-green"
                  style={{ fontSize: 13, padding: '8px 16px' }}
                  onClick={() => handleSubmit(task.id)}
                  disabled={!proof[task.id]?.trim()}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPanel;
