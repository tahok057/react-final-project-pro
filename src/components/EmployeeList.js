import React from 'react';
import EmployeeCard from './EmployeeCard';
import { Container, Row, Col } from 'react-bootstrap';

const EmployeeList = ({ employees, onMoreInfo }) => {
  return (
    <Container>
      <Row>
        {employees.map(employee => (
          <Col key={employee.login.uuid} xs={12} md={6} lg={4}>
            <EmployeeCard employee={employee} onMoreInfo={onMoreInfo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EmployeeList;
