import React from 'react';
import './ScoreCard.css';

const gradeColors = {
  'A+': '#3fb950',
  'A':  '#58a6ff',
  'B':  '#d29922',
  'C':  '#f0883e',
  'D':  '#f85149',
};

const breakdownLabels = {
  bio: 'Bio',
  avatar: 'Profile Photo',
  location: 'Location',
  website: 'Website/Portfolio',
  followers: 'Followers',
  repoCount: 'Repo Count',
  stars: 'Total Stars',
  descriptions: 'Repo Descriptions',
  topics: 'Repo Topics',
  activity: 'Recent Activity',
};

function ScoreCard({ score, grade, breakdown }) {
  const color = gradeColors[grade] || '#8b949e';
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card score-card">
      <h3 className="card-title">Profile Score</h3>

      <div className="score-circle-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#21262d" strokeWidth="10" />
          <circle
            cx="70" cy="70" r="54" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="score-center">
          <span className="score-num" style={{ color }}>{score}</span>
          <span className="score-grade" style={{ color }}>{grade}</span>
        </div>
      </div>

      <div className="breakdown">
        {Object.entries(breakdown).map(([key, val]) => {
          const max = key === 'stars' ? 15 : key === 'followers' || key === 'repoCount' ? 10 : 10;
          const pct = Math.round((val / max) * 100);
          return (
            <div className="breakdown-row" key={key}>
              <span className="breakdown-label">{breakdownLabels[key] || key}</span>
              <div className="breakdown-bar-wrap">
                <div className="breakdown-bar" style={{ width: `${pct}%`, background: color }} />
              </div>
              <span className="breakdown-val">{val}/{max}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreCard;
