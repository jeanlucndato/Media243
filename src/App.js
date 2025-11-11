// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage'; // À créer si vous avez une page d'inscription séparée
import './App.css'; // Si vous avez suivi l'option 1 pour App.css

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/media/:id" element={<DetailPage />} />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;