import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Créer le Context
const AuthContext = createContext();

// URL de base de votre API Backend
const API_URL = 'https://votre-backend.com/api/auth';

// 2. Créer le Provider (le gardien de l'état)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Informations utilisateur
    const [loading, setLoading] = useState(true); // Indique si on vérifie la session

    // ----------------------------------------------------
    // A. Fonction de Connexion (Login)
    // ----------------------------------------------------
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/login`, { email, password });

            const { user: userData, token } = response.data;

            // Stocker le token dans le stockage local (LocalStorage pour Web, AsyncStorage pour RN)
            localStorage.setItem('media243_token', token);
            // Optionel: Stocker les informations utilisateur
            setUser(userData);

            // Configurer Axios pour ajouter le token à toutes les requêtes futures
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setLoading(false);
            return userData;

        } catch (error) {
            setLoading(false);
            // Gérer l'erreur (ex: identifiants incorrects)
            throw new Error(error.response?.data?.message || 'Échec de la connexion.');
        }
    };

    // ----------------------------------------------------
    // B. Fonction de Déconnexion (Logout)
    // ----------------------------------------------------
    const logout = () => {
        localStorage.removeItem('media243_token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // ----------------------------------------------------
    // C. Vérification de la Session au chargement
    // ----------------------------------------------------
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('media243_token');
            if (token) {
                // Tenter de rafraîchir ou vérifier le token auprès du backend
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // **Ici, vous feriez un appel à votre endpoint /verify-token**
                try {
                    const res = await axios.get(`${API_URL}/verify-token`);
                    setUser(res.data.user);
                } catch (error) {
                    // Si le token est invalide ou expiré, déconnecter
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []); // S'exécute une seule fois au montage

    // ----------------------------------------------------
    // NOUVEAU : Fonction d'Inscription (Signup)
    // ----------------------------------------------------
    const signup = async (name, email, password) => {
        try {
            setLoading(true);
            // NOTE: L'objet envoyé au Backend doit correspondre à ce que votre API attend
            const response = await axios.post(`${API_URL}/signup`, { name, email, password });

            const { user: userData, token } = response.data;

            // La logique de stockage du token et de l'utilisateur est la même que pour le login
            localStorage.setItem('media243_token', token);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setLoading(false);
            return userData;

        } catch (error) {
            setLoading(false);
            // Gérer l'erreur (ex: email déjà utilisé)
            throw new Error(error.response?.data?.message || 'Échec de l\'inscription. Veuillez réessayer.');
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* On n'affiche les enfants que lorsque la vérification est terminée */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// 3. Hook personnalisé pour l'utilisation facile dans d'autres composants
export const useAuth = () => {
    return useContext(AuthContext);
};