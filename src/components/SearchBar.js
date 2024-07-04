import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Form className="my-3">
      <Form.Group controlId="formBasicSearch">
        <Form.Control 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter company name..." 
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSearch} className="mt-2">Search</Button>
    </Form>
  );
};

export default SearchBar;
