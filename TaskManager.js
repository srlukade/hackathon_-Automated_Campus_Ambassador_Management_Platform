import React, { useState } from 'react';
import './TaskManager.css';

const typeClass = { referral: 'tag-referral', promotion: 'tag-promotion', content: 'tag-content', engagement: 'tag-engagement' };

function TaskManager({ tasks }) {
  const [submissions] = useState([
    { ambassador: 'Arjun Sharma', task: 'Share CampusConnect on LinkedIn', proof: 'https://linkedin.com/post/123', status: 'pending' },
    { ambassador: 'Priya Patel', task: 'Refer 3 new ambassadors', proof: 'Referred: Amit, Riya, Suresh', status: 'approved' },
    { ambassador: 'Rahul Verma', task: 'Create a GitHub repo showcase', proof: 'https://github.com/rahul/showcase', status: 'pending' },
  ]);

  return (
    <div className="task-manager">
      <div className="tm-header">
        <h2>📋 Task Management</h2>
        <p>Manage and verify ambassador task submissions</p>
      </div>

      <div className="tm-section">
        <h3>Active Tasks</h3>
        <div className="tm-tasks-grid">
          {tasks.map(t => (
            <div key={t.id} className="tm-task-card">
              <div className="tm-task-top">
                <span className={`badge-pill ${typeClass[t.type]}`}>{t.type}</span>
                <span className="tm-pts">+{t.points} pts</span>
              </div>
              <div className="tm-task-title">{t.title}</div>
              <div className="tm-task-deadline">Due: {new Date(t.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="tm-section">
        <h3>Recent Submissions</h3>
        <div className="submissions-table">
          <div className="sub-row sub-head">
            <span>Ambassador</span><span>Task</span><span>Proof</span><span>Status</span><span>Action</span>
          </div>
          {submissions.map((s, i) => (
            <div key={i} className="sub-row">
              <span className="sub-name">{s.ambassador}</span>
              <span className="sub-task">{s.task}</span>
              <a href={s.proof.startsWith('http') ? s.proof : '#'} target="_blank" rel="noreferrer" className="sub-proof">
                {s.proof.startsWith('http') ? '🔗 View' : s.proof}
              </a>
              <span className={`sub-status ${s.status}`}>{s.status === 'approved' ? '✅ Approved' : '⏳ Pending'}</span>
              <span>
                {s.status === 'pending' && (
                  <button className="btn btn-green" style={{ fontSize: 12, padding: '5px 12px' }}>Approve</button>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
