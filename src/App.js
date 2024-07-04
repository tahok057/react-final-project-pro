import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import FavoritesList from './components/FavoritesList';
import { searchEmployees } from './services/api';
import FavoritesProvider from './context/FavoritesContext';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (company) => {
    try {
      const results = await searchEmployees(company);
      setEmployees(results);
    } catch (error) {
      alert('Failed to fetch employees.');
    }
  };

  const handleMoreInfo = (employee) => {
    setSelectedEmployee(employee);
    navigate('/employee-details');
  };

  const handleBack = () => {
    setSelectedEmployee(null);
    navigate('/');
  };

  return (
    <FavoritesProvider>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Employee Search</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
        </Nav>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <EmployeeList employees={employees} onMoreInfo={handleMoreInfo} />
              </>
            } 
          />
          <Route 
            path="/employee-details" 
            element={
              selectedEmployee && <EmployeeDetails employee={selectedEmployee} onBack={handleBack} />
            } 
          />
          <Route 
            path="/favorites" 
            element={<FavoritesList onMoreInfo={handleMoreInfo} />} 
          />
        </Routes>
      </div>
    </FavoritesProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
