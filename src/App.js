// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
// Le ProtectedRoute est toujours là, mais on ne l'utilise plus pour les pages de design
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <Router>
          <div className="App">
            <Routes>

              {/* ROUTES PUBLIQUES (Accessibles à tous pour le design) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/search" element={<SearchPage />} />

              {/* 💡 CORRECTION : DETAILPAGE EST MAINTENANT PUBLIQUE POUR FACILITER LE DÉVELOPPEMENT */}
              <Route path="/media/:id" element={<DetailPage />} />

              {/* ROUTE PROTÉGÉE (Laisser ici pour la future logique) */}
              {/* Vous pouvez ajouter ici la route vers le profil, etc., une fois que l'API est connectée. */}
              <Route element={<ProtectedRoute />}>
                {/* Exemple : <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>

              {/* Route 404 de secours */}
              <Route path="*" element={<div>404 Page non trouvée</div>} />
            </Routes>
          </div>
        </Router>
      </MediaProvider>
    </AuthProvider>
  );
}
export default App;