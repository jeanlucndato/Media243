// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Affiche un indicateur de chargement pendant la vérification du token
        return <div>Chargement de la session...</div>;
    }

    // Si l'utilisateur est authentifié, affiche le contenu imbriqué (DetailPage, etc.)
    if (isAuthenticated) {
        return <Outlet />;
    }

    // Sinon, redirection immédiate vers la page de connexion
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;