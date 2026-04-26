import React from 'react';
import './TipsPanel.css';

function TipsPanel({ tips }) {
  if (!tips || tips.length === 0) {
    return (
      <div className="card tips-panel">
        <h3 className="card-title">🎉 Recruiter-Ready Tips</h3>
        <p className="tips-empty">Your profile looks great! Keep it up.</p>
      </div>
    );
  }

  return (
    <div className="card tips-panel">
      <h3 className="card-title">💡 Next Steps to Become Recruiter-Ready</h3>
      <ul className="tips-list">
        {tips.map((tip, i) => (
          <li key={i} className="tip-item">
            <span className="tip-num">{i + 1}</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipsPanel;
