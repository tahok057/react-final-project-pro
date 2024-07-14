import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import WorkerSearchBar from './components/WorkerSearchBar';
import WorkerListDisplay from './components/WorkerListDisplay';
import WorkerFavorites from './components/WorkerFavorites';
import WorkerDetails from './components/WorkerDetails';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="worker-app-container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/favs">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favs" element={<WorkerFavoritesWrapper />} />
          <Route path="/employee" element={<WorkerDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10&seed=default');
        const data = await response.json();
        const workersWithCompany = data.results.map(worker => ({
          ...worker,
          company: 'default company'
        }));
        setWorkers(workersWithCompany);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10&seed=${searchTerm}`);
      const data = await response.json();
      const workersWithCompany = data.results.map(worker => ({
        ...worker,
        company: searchTerm
      }));
      setWorkers(workersWithCompany);
      navigate(`/?search=${searchTerm}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const viewDetails = (worker, index) => {
    const workerWithDetails = { ...worker, company: worker.company };
    localStorage.setItem('currentWorker', JSON.stringify(workerWithDetails));
    navigate(`/employee/?company=${worker.company}&index=${index}`);
  };

  const addToFavorites = (worker) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const workerWithDetails = { ...worker, company: worker.company };
    const updatedFavorites = [...existingFavorites, workerWithDetails];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <WorkerSearchBar onSearch={handleSearch} />
      <WorkerListDisplay workers={workers} onViewDetails={viewDetails} onAddToFavorites={addToFavorites} />
    </>
  );
}

function WorkerFavoritesWrapper() {
  const navigate = useNavigate();

  const handleViewDetails = (worker, index) => {
    localStorage.setItem('currentWorker', JSON.stringify(worker));
    navigate(`/employee/?company=${worker.company}&index=${index}`);
  };

  return <WorkerFavorites onViewDetails={handleViewDetails} />;
}

function WorkerDetailsWrapper() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const company = query.get('company');

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const storedWorker = JSON.parse(localStorage.getItem('currentWorker'));
    if (storedWorker && storedWorker.company === company) {
      setWorker(storedWorker);
    }
  }, [company]);

  if (!worker) {
    return <div>Loading...</div>;
  }

  return <WorkerDetails worker={worker} onBack={() => window.history.back()} />;
}

export default App;
