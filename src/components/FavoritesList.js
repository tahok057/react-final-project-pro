import React, { useContext } from 'react';
import EmployeeCard from './EmployeeCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { Container, Row, Col } from 'react-bootstrap';

const FavoritesList = ({ onMoreInfo }) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Container>
      <Row>
        {favorites.map(employee => (
          <Col key={employee.login.uuid} xs={12} md={6} lg={4}>
            <EmployeeCard employee={employee} onMoreInfo={onMoreInfo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesList;
