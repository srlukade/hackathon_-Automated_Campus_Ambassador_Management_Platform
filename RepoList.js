import React, { useState } from 'react';
import './RepoList.css';

const actionConfig = {
  good:    { label: '✅ Good',    color: '#3fb950', bg: '#3fb95022' },
  improve: { label: '🔧 Improve', color: '#d29922', bg: '#d2992222' },
  archive: { label: '📦 Archive', color: '#8b949e', bg: '#8b949e22' },
};

function RepoList({ repos }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? repos : repos.filter((r) => r.action === filter);

  return (
    <div className="card repo-list">
      <div className="repo-header">
        <h3 className="card-title">📁 Repository Analysis</h3>
        <div className="repo-filters">
          {['all', 'good', 'improve', 'archive'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="filter-count">
                {f === 'all' ? repos.length : repos.filter((r) => r.action === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="repo-grid">
        {filtered.map((repo) => {
          const cfg = actionConfig[repo.action] || actionConfig.good;
          return (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
            >
              <div className="repo-card-top">
                <span className="repo-name">{repo.name}</span>
                <span className="repo-action" style={{ color: cfg.color, background: cfg.bg }}>
                  {cfg.label}
                </span>
              </div>
              {repo.description && <p className="repo-desc">{repo.description}</p>}
              <div className="repo-meta">
                {repo.language && <span className="repo-lang">● {repo.language}</span>}
                <span>⭐ {repo.stars}</span>
                <span>🍴 {repo.forks}</span>
              </div>
              {repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 4).map((t) => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="no-repos">No repositories in this category.</p>
      )}
    </div>
  );
}

export default RepoList;
