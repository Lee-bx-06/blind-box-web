import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BlindBoxListPage from './pages/BlindBoxListPage';
import UserOrdersPage from './pages/UserOrdersPage';
import PlayerShowPage from './pages/PlayerShowPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlindBoxDetailPage from './pages/BlindBoxDetailPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blind-boxes" element={<BlindBoxListPage />} />
            <Route path="/orders" element={<UserOrdersPage />} />
            <Route path="/player" element={<PlayerShowPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blind-boxes/:id" element={<BlindBoxDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;