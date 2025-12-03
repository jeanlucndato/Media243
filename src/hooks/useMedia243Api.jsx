import { useState, useCallback } from 'react';
import axios from 'axios';

// 🔑 L'URL de votre API Next.js (doit être le même que dans LoginPage.js)
// ASSUREZ-VOUS QUE 3000 EST LE PORT DE VOTRE BACKEND NEXT.JS !
const API_AUTH_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3000/api') + '/auth';

/**
 * Hook personnalisé pour gérer l'authentification (Inscription/Connexion)
 * vers l'API Next.js /api/auth.
 * * Note: Dans un environnement de production, vous utiliseriez des variables d'environnement 
 * pour stocker l'URL (ex: process.env.REACT_APP_API_URL).
 */
const useMedia243Api = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fonction d'inscription (Signup)
    const signup = useCallback(async ({ email, password }) => {
        setLoading(true);
        setError(null);

        try {
            // L'API Next.js /api/auth attend un objet 'action'
            const payload = {
                action: 'signup', // Clé critique pour l'inscription
                email,
                password,
            };

            const response = await axios.post(API_AUTH_URL, payload);

            setLoading(false);
            // Stocker le token immédiatement après l'inscription (facultatif, mais utile)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return {
                message: response.data.message,
                userId: response.data.user.id,
            };

        } catch (err) {
            setLoading(false);

            // Tente d'extraire le message d'erreur spécifique de l'API Next.js
            const errorMessage = err.response?.data?.message || 'Erreur réseau ou service indisponible.';
            setError(errorMessage);

            console.error('Erreur dans le hook signup:', err);
            // Renvoyer l'erreur pour que le composant appelant (SignupPage) puisse la gérer si besoin
            throw new Error(errorMessage);
        }
    }, []);

    // Vous pouvez ajouter la fonction 'login' ici aussi pour un hook complet
    // const login = useCallback(async ({ email, password }) => { ... }, []);

    return {
        loading,
        error,
        signup,
        // login, // Pourrait être exposé ici également
    };
};

export default useMedia243Api;