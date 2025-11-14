import { useState, useCallback } from 'react';
import axios from 'axios';

// URL de base de votre backend Express
// NOTE: Cette URL doit pointer vers votre serveur (ex: 'http://localhost:5000/api')
const API_BASE_URL = 'http://localhost:5000/api';

const useMedia243Api = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Vérifie si un token existe au démarrage

    // Fonction de déconnexion pour la gestion des erreurs 401
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    // Fonction générique pour effectuer les requêtes API
    const apiRequest = useCallback(async (method, endpoint, data = null, needsAuth = true) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const headers = {};

        if (needsAuth && token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const url = `${API_BASE_URL}${endpoint}`;

            let response;
            switch (method.toLowerCase()) {
                case 'get':
                    // Ajout de 'axios' si manquant
                    if (typeof axios === 'undefined') {
                        throw new Error("La bibliothèque 'axios' n'est pas disponible. Assurez-vous qu'elle est chargée.");
                    }
                    response = await axios.get(url, { headers, params: data });
                    break;
                case 'post':
                    response = await axios.post(url, data, { headers });
                    break;
                default:
                    throw new Error(`Méthode HTTP non supportée: ${method}`);
            }

            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || err.message || 'Erreur de communication avec le serveur.';
            setError(errorMessage);

            if (err.response?.status === 401) {
                logout();
            }

            throw new Error(errorMessage);
        }
    }, [logout]);

    // --- Fonctions d'authentification ---

    const signup = useCallback(async ({ email, password }) => {
        const result = await apiRequest('POST', '/signup', { email, password }, false);
        return result;
    }, [apiRequest]);

    const login = useCallback(async ({ email, password }) => {
        const result = await apiRequest('POST', '/login', { email, password }, false);

        if (result.token) {
            localStorage.setItem('token', result.token);
            setIsAuthenticated(true);
        }
        return result;
    }, [apiRequest]);

    // --- Fonction pour obtenir les films ---

    const getMovies = useCallback(async () => {
        const result = await apiRequest('GET', '/movies', null, false);
        return result;
    }, [apiRequest]);


    return {
        loading,
        error,
        isAuthenticated,
        signup,
        login,
        logout,
        getMovies,
    };
};

export default useMedia243Api;