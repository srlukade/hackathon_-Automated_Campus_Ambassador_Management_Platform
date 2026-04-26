import React from 'react';
import './BadgesPanel.css';

const allBadges = [
  { id: 'early',   icon: '🚀', name: 'Early Adopter',    desc: 'Joined the ambassador program',         req: 'Analyze your GitHub profile' },
  { id: 'star',    icon: '⭐', name: 'Star Contributor',  desc: 'GitHub score of 60 or above',           req: 'Score 60+ on GitHub analysis' },
  { id: 'top',     icon: '🔥', name: 'Top Performer',     desc: 'GitHub score of 80 or above',           req: 'Score 80+ on GitHub analysis' },
  { id: 'elite',   icon: '💎', name: 'Elite Ambassador',  desc: 'GitHub score of 90 or above',           req: 'Score 90+ on GitHub analysis' },
  { id: 'streak',  icon: '📅', name: '7-Day Streak',      desc: 'Active for 7 consecutive days',         req: 'Log in 7 days in a row' },
  { id: 'task5',   icon: '✅', name: 'Task Master',       desc: 'Completed 5 tasks',                     req: 'Complete 5 tasks' },
  { id: 'refer',   icon: '🤝', name: 'Connector',         desc: 'Referred 3 ambassadors',                req: 'Submit 3 referral tasks' },
  { id: 'content', icon: '✍️', name: 'Content Creator',   desc: 'Submitted a content task',              req: 'Submit a content task' },
];

function BadgesPanel({ badges, score, analyzed }) {
  const earned = new Set(badges);

  return (
    <div className="badges-panel">
      <div className="badges-header">
        <h2>🎖️ My Badges</h2>
        <p>Earn badges by completing tasks and improving your GitHub profile</p>
      </div>

      {!analyzed && (
        <div className="badges-hint">
          💡 Analyze your GitHub profile first to unlock badges based on your score.
        </div>
      )}

      <div className="badges-grid">
        {allBadges.map(b => {
          const isEarned = earned.has(`${b.icon} ${b.name}`);
          return (
            <div key={b.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
              <div className="badge-icon">{isEarned ? b.icon : '🔒'}</div>
              <div className="badge-name">{b.name}</div>
              <div className="badge-desc">{isEarned ? b.desc : b.req}</div>
              {isEarned && <div className="badge-earned-tag">Earned</div>}
            </div>
          );
        })}
      </div>

      {analyzed && score !== undefined && (
        <div className="card streak-card">
          <h3>🔥 Current Streak</h3>
          <div className="streak-days">
            {[1,2,3,4,5,6,7].map(d => (
              <div key={d} className={`streak-day ${d <= 3 ? 'active' : ''}`}>{d}</div>
            ))}
          </div>
          <p className="streak-note">3 day streak — keep going to earn the 7-Day Streak badge!</p>
        </div>
      )}
    </div>
  );
}

export default BadgesPanel;
