import React from 'react';
import './Leaderboard.css';

const medals = ['🥇', '🥈', '🥉'];

function Leaderboard({ ambassadors }) {
  const sorted = [...ambassadors].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard">
      <div className="lb-header">
        <h2>🏆 Ambassador Leaderboard</h2>
        <p>Ranked by total points earned</p>
      </div>

      <div className="lb-podium">
        {sorted.slice(0, 3).map((a, i) => (
          <div key={a.id} className={`podium-card rank-${i + 1}`}>
            <div className="podium-medal">{medals[i]}</div>
            <img src={a.avatar} alt={a.name} className="podium-avatar"
              onError={e => e.target.src = `https://ui-avatars.com/api/?name=${a.name}&background=1f6feb&color=fff&size=80`} />
            <div className="podium-name">{a.name}</div>
            <div className="podium-college">{a.college}</div>
            <div className="podium-points">{a.points.toLocaleString()} pts</div>
            <div className="podium-score">GitHub: {a.score}/100 ({a.grade})</div>
          </div>
        ))}
      </div>

      <div className="lb-table">
        <div className="lb-row lb-head">
          <span>Rank</span><span>Ambassador</span><span>College</span>
          <span>GitHub Score</span><span>Tasks</span><span>Points</span>
        </div>
        {sorted.map((a, i) => (
          <div key={a.id} className={`lb-row ${i < 3 ? 'top-row' : ''}`}>
            <span className="lb-rank">{i < 3 ? medals[i] : `#${i + 1}`}</span>
            <span className="lb-name">
              <img src={a.avatar} alt={a.name} className="lb-avatar"
                onError={e => e.target.src = `https://ui-avatars.com/api/?name=${a.name}&background=1f6feb&color=fff&size=32`} />
              {a.name}
            </span>
            <span className="lb-college">{a.college}</span>
            <span className="lb-score">
              <span className={`grade-badge grade-${a.grade.replace('+', 'plus')}`}>{a.grade}</span>
              {a.score}/100
            </span>
            <span>{a.tasksCompleted}</span>
            <span className="lb-pts">{a.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
