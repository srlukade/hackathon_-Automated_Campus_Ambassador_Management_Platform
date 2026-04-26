import React from 'react';
import './ProfileCard.css';

function ProfileCard({ user }) {
  const joinYear = new Date(user.created_at).getFullYear();

  return (
    <div className="card profile-card">
      <div className="profile-top">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer" className="username">
            @{user.login}
          </a>
          {user.bio && <p className="bio">{user.bio}</p>}
        </div>
      </div>

      <div className="profile-meta">
        {user.location && (
          <span>📍 {user.location}</span>
        )}
        {user.blog && (
          <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank" rel="noreferrer">
            🔗 Website
          </a>
        )}
        <span>📅 Joined {joinYear}</span>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-val">{user.public_repos}</span>
          <span className="stat-label">Repos</span>
        </div>
        <div className="stat">
          <span className="stat-val">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-val">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
