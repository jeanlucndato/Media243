// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';
import { AdminProvider } from './contexts/AdminContext';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContentManagement from './pages/admin/ContentManagement';
import UserManagement from './pages/admin/UserManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <AdminProvider>
          <Router>
            <div className="App">
              <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/media/:id" element={<DetailPage />} />

                {/* ADMIN ROUTES */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="content" element={<ContentManagement />} />
                    <Route path="users" element={<UserManagement />} />
                  </Route>
                </Route>

                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                  {/* Example: <Route path="/profile" element={<ProfilePage />} /> */}
                </Route>

                {/* 404 ROUTE */}
                <Route path="*" element={<div>404 Page non trouvée</div>} />
              </Routes>
            </div>
          </Router>
        </AdminProvider>
      </MediaProvider>
    </AuthProvider>
  );
}
export default App;