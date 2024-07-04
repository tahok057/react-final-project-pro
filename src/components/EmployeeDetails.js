import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const EmployeeDetails = ({ employee, onBack }) => {
  return (
    <Card>
      <Card.Img variant="top" src={employee.picture.large} alt={employee.name.first} />
      <Card.Body>
        <Card.Title>{employee.name.first} {employee.name.last}</Card.Title>
        <Card.Text>Age: {employee.dob.age}</Card.Text>
        <Card.Text>Email: {employee.email}</Card.Text>
        <Card.Text>Phone: {employee.phone}</Card.Text>
        <Card.Text>Location: {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}</Card.Text>
        <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} style={{ height: '200px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}></Marker>
        </MapContainer>
        <Button variant="secondary" onClick={onBack} className="mt-3">Back</Button>
      </Card.Body>
    </Card>
  );
};

export default EmployeeDetails;
