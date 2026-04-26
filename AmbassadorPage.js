import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import ProfileCard from '../components/ProfileCard';
import ScoreCard from '../components/ScoreCard';
import TipsPanel from '../components/TipsPanel';
import RepoList from '../components/RepoList';
import TasksPanel from '../components/TasksPanel';
import BadgesPanel from '../components/BadgesPanel';
import './AmbassadorPage.css';

const TABS = ['GitHub Analyzer', 'My Tasks', 'My Badges'];

function AmbassadorPage() {
  const { setView, addAmbassador, tasks } = useApp();
  const [tab, setTab] = useState('GitHub Analyzer');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const analyze = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/analyze/${username.trim()}`);
      setData(res.data);
      addAmbassador({
        name: res.data.user.name || res.data.user.login,
        github: res.data.user.login,
        college: 'Unknown College',
        score: res.data.score,
        grade: res.data.grade,
        avatar: res.data.user.avatar_url,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const earnedBadges = data ? [
    '🚀 Early Adopter',
    ...(data.score >= 60 ? ['⭐ Star Contributor'] : []),
    ...(data.score >= 80 ? ['🔥 Top Performer'] : []),
    ...(data.score >= 90 ? ['💎 Elite Ambassador'] : []),
  ] : [];

  return (
    <div className="ambassador-page">
      <nav className="page-nav">
        <div className="nav-logo" onClick={() => setView('landing')}>🎓 CampusConnect</div>
        <div className="nav-tabs">
          {TABS.map(t => (
            <button key={t} className={`nav-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <button className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }} onClick={() => setView('landing')}>← Back</button>
      </nav>

      <div className="amb-content">
        {tab === 'GitHub Analyzer' && (
          <div className="analyzer-wrap">
            <div className="analyzer-hero">
              <h2>Analyze Your GitHub Profile</h2>
              <p>Get your recruiter-ready score in under 2 minutes</p>
              <form className="search-form" onSubmit={analyze}>
                <input
                  type="text"
                  placeholder="Enter your GitHub username..."
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="btn btn-green" disabled={loading || !username.trim()}>
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
              </form>
              {error && <div className="error-msg">⚠️ {error}</div>}
            </div>

            {loading && (
              <div className="loading-wrap">
                <div className="spinner" />
                <p>Fetching GitHub data...</p>
              </div>
            )}

            {data && (
              <div className="results">
                <div className="results-top">
                  <ProfileCard user={data.user} />
                  <ScoreCard score={data.score} grade={data.grade} breakdown={data.breakdown} />
                </div>
                <TipsPanel tips={data.tips} />
                <RepoList repos={data.repoInsights} />
              </div>
            )}
          </div>
        )}

        {tab === 'My Tasks' && <TasksPanel tasks={tasks} />}
        {tab === 'My Badges' && <BadgesPanel badges={earnedBadges} score={data?.score} analyzed={!!data} />}
      </div>
    </div>
  );
}

export default AmbassadorPage;
