import React from 'react';
import { useApp } from '../context/AppContext';
import './LandingPage.css';

function LandingPage() {
  const { setView } = useApp();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="nav-logo">🎓 CampusConnect</div>
        <div className="nav-actions">
          <button className="btn btn-outline" onClick={() => setView('org')}>Org Dashboard</button>
          <button className="btn btn-green" onClick={() => setView('ambassador')}>Join as Ambassador</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-badge">✨ AICore Connect Hackathon</div>
        <h1>Turn Campus Ambassadors Into a<br /><span className="gradient-text">Growth Engine</span></h1>
        <p className="hero-sub">
          CampusConnect automates ambassador onboarding, task tracking, and gamification —
          while using GitHub profile analysis to identify your top performers instantly.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-green hero-btn" onClick={() => setView('ambassador')}>
            🚀 I'm an Ambassador
          </button>
          <button className="btn btn-blue hero-btn" onClick={() => setView('org')}>
            🏢 I'm an Organization
          </button>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Real-Time Leaderboard</h3>
            <p>Surface top performers through a live points engine and GitHub score analysis.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Workflows</h3>
            <p>Assign referrals, promotions, and content tasks with auto-scoring and proof upload.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎖️</div>
            <h3>Badges & Streaks</h3>
            <p>Keep ambassadors motivated with badges, streaks, and weekly rewards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>GitHub Analyzer</h3>
            <p>Analyze any GitHub profile in under 2 minutes — score, grade, and recruiter tips.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item"><span className="stat-num">500+</span><span className="stat-lbl">Ambassadors</span></div>
        <div className="stat-item"><span className="stat-num">50+</span><span className="stat-lbl">Colleges</span></div>
        <div className="stat-item"><span className="stat-num">2 min</span><span className="stat-lbl">GitHub Analysis</span></div>
        <div className="stat-item"><span className="stat-num">100%</span><span className="stat-lbl">Automated</span></div>
      </section>
    </div>
  );
}

export default LandingPage;
