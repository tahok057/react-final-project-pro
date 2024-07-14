import React, { useState, useEffect } from 'react';

function WorkerFavorites({ onViewDetails }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (workerToRemove) => {
    const updatedFavorites = favorites.filter(worker => worker.login.uuid !== workerToRemove.login.uuid);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="worker-favorites-container">
      <h2>Favorites</h2>
      <div className="worker-list-display">
        {favorites.map((worker, index) => (
          <div key={worker.login.uuid} className="worker-card">
            <img src={worker.picture.thumbnail} alt={`${worker.name.first} ${worker.name.last}`} className="worker-avatar" />
            <h3 className="worker-name">{worker.name.first} {worker.name.last}</h3>
            <p className="worker-location">{worker.location.city}, {worker.location.country}</p>
            <p className="worker-age">Age: {worker.dob.age}</p>
            <button className="details-button" onClick={() => onViewDetails(worker, index + 1)}>View Details</button>
            <button className="remove-button" onClick={() => removeFavorite(worker)}>Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkerFavorites;
