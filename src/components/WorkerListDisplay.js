import React from 'react';

function WorkerListDisplay({ workers, onViewDetails, onAddToFavorites }) {
  return (
    <div className="worker-list-display">
      {workers.map((worker, index) => (
        <div key={worker.login.uuid} className="worker-card">
          <img src={worker.picture.thumbnail} alt={`${worker.name.first} ${worker.name.last}`} className="worker-avatar" />
          <h3 className="worker-name">{worker.name.first} {worker.name.last}</h3>
          <p className="worker-location">{worker.location.city}, {worker.location.country}</p>
          <p className="worker-age">Age: {worker.dob.age}</p>
          <button className="details-button" onClick={() => onViewDetails(worker, index + 1)}>View Details</button>
          <button className="favorite-button" onClick={() => onAddToFavorites(worker)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
}

export default WorkerListDisplay;
