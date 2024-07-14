import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function WorkerDetails({ worker, onBack }) {
  const navigate = useNavigate();

  if (!worker) {
    navigate('/favs');
    return null;
  }

  const position = [worker.location.coordinates.latitude, worker.location.coordinates.longitude];

  return (
    <div className="worker-details-container">
      <button onClick={onBack}>Back</button>
      <div className="worker-details-card">
        <img src={worker.picture.large} alt={`${worker.name.first} ${worker.name.last}`} className="worker-avatar-large"/>
        <h3 className="worker-name">{worker.name.first} {worker.name.last}</h3>
        <p className="worker-location">{worker.location.city}, {worker.location.country}</p>
        <p className="worker-age">Age: {worker.dob.age}</p>
        <p className="worker-email">Email: {worker.email}</p>
        <p className="worker-phone">Phone: {worker.phone}</p>
        <p className="worker-address">Address: {worker.location.street.number} {worker.location.street.name}, {worker.location.city}, {worker.location.state}, {worker.location.postcode}</p>
        <MapContainer center={position} zoom={13} className="leaflet-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {worker.name.first} {worker.name.last}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default WorkerDetails;
