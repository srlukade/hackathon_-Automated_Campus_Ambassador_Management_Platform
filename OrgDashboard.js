import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Leaderboard from '../components/Leaderboard';
import TaskManager from '../components/TaskManager';
import './OrgDashboard.css';

const TABS = ['Overview', 'Leaderboard', 'Tasks'];

function OrgDashboard() {
  const { setView, ambassadors, tasks } = useApp();
  const [tab, setTab] = useState('Overview');

  const totalPoints = ambassadors.reduce((s, a) => s + a.points, 0);
  const avgScore = Math.round(ambassadors.reduce((s, a) => s + a.score, 0) / ambassadors.length);
  const totalTasks = ambassadors.reduce((s, a) => s + a.tasksCompleted, 0);

  return (
    <div className="org-page">
      <nav className="page-nav">
        <div className="nav-logo" onClick={() => setView('landing')}>🎓 CampusConnect</div>
        <div className="nav-tabs">
          {TABS.map(t => (
            <button key={t} className={`nav-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <button className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }} onClick={() => setView('landing')}>← Back</button>
      </nav>

      <div className="org-content">
        {tab === 'Overview' && (
          <>
            <div className="org-header">
              <h2>Organization Dashboard</h2>
              <p>Track your campus ambassador program in real-time</p>
            </div>

            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">👥</div>
                <div className="kpi-val">{ambassadors.length}</div>
                <div className="kpi-lbl">Total Ambassadors</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">⭐</div>
                <div className="kpi-val">{avgScore}</div>
                <div className="kpi-lbl">Avg GitHub Score</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">✅</div>
                <div className="kpi-val">{totalTasks}</div>
                <div className="kpi-lbl">Tasks Completed</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">🏆</div>
                <div className="kpi-val">{totalPoints.toLocaleString()}</div>
                <div className="kpi-lbl">Total Points Earned</div>
              </div>
            </div>

            <div className="overview-bottom">
              <div className="card top-performers">
                <h3>🔥 Top Performers</h3>
                <div className="performer-list">
                  {[...ambassadors].sort((a, b) => b.score - a.score).slice(0, 3).map((a, i) => (
                    <div key={a.id} className="performer-row">
                      <span className="rank">#{i + 1}</span>
                      <img src={a.avatar} alt={a.name} className="perf-avatar" onError={e => e.target.src = `https://ui-avatars.com/api/?name=${a.name}&background=1f6feb&color=fff`} />
                      <div className="perf-info">
                        <span className="perf-name">{a.name}</span>
                        <span className="perf-college">{a.college}</span>
                      </div>
                      <div className="perf-score" style={{ color: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : '#cd7f32' }}>
                        {a.score}/100
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card grade-dist">
                <h3>📊 Grade Distribution</h3>
                {['A+', 'A', 'B', 'C', 'D'].map(g => {
                  const count = ambassadors.filter(a => a.grade === g).length;
                  const pct = Math.round((count / ambassadors.length) * 100);
                  return (
                    <div key={g} className="grade-row">
                      <span className="grade-label">{g}</span>
                      <div className="grade-bar-wrap">
                        <div className="grade-bar" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="grade-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === 'Leaderboard' && <Leaderboard ambassadors={ambassadors} />}
        {tab === 'Tasks' && <TaskManager tasks={tasks} />}
      </div>
    </div>
  );
}

export default OrgDashboard;
