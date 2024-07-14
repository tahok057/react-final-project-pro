import React, { useState } from 'react';

function WorkerSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <div className="worker-search-bar-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for workers..." value={searchTerm} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default WorkerSearchBar;
