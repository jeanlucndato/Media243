// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute'; // <-- NOUVEAU
import { AuthProvider } from './contexts/AuthContext'; // <-- NOUVEAU
import './App.css';

function App() {
  return (
    // 1. Envelopper toute l'application avec le AuthProvider
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>

            {/* ROUTES PUBLIQUES (accessibles à tous) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 2. ROUTE PROTÉGÉE */}
            {/* On crée un 'groupe' de routes qui nécessitent d'être connecté */}
            <Route element={<ProtectedRoute />}>

              {/* Le contenu de la plateforme est maintenant sécurisé par ProtectedRoute */}
              <Route path="/media/:id" element={<DetailPage />} />
              {/* Ajoutez ici toutes les routes nécessitant une connexion (WatchPage, Profil, etc.) */}

            </Route>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;