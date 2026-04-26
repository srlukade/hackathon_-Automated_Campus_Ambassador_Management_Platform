import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrap">
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          autoFocus
        />
      </div>
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}

export default SearchBar;
