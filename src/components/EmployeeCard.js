import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FavoritesContext } from '../context/FavoritesContext';

const EmployeeCard = ({ employee, onMoreInfo }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const isFavorite = favorites.some(fav => fav.login.uuid === employee.login.uuid);

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={employee.picture.medium} alt={employee.name.first} />
      <Card.Body>
        <Card.Title>{employee.name.first} {employee.name.last}</Card.Title>
        <Card.Text>Age: {employee.dob.age}</Card.Text>
        <Card.Text>Location: {employee.location.city}, {employee.location.country}</Card.Text>
        <Button variant="info" onClick={() => onMoreInfo(employee)}>More Info</Button>
        <Button 
          variant={isFavorite ? 'danger' : 'success'} 
          onClick={() => isFavorite ? removeFromFavorites(employee) : addToFavorites(employee)} 
          className="ml-2"
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmployeeCard;
