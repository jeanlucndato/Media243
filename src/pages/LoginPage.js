// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Pour faire les appels API

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Pour rediriger après la connexion

    const API_BASE_URL = 'http://localhost:5000/api'; // <--- ASSUREZ-VOUS QUE C'EST L'URL DE VOTRE BACKEND EXPRESS !

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        setError(''); // Réinitialise les erreurs

        try {
            // Appel à l'API de connexion de votre backend Express
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });

            // Si la connexion réussit
            console.log('Connexion réussie:', response.data);
            // Stockez le token JWT (si votre backend en renvoie un)
            localStorage.setItem('token', response.data.token);
            // Redirigez l'utilisateur vers la page d'accueil
            navigate('/');

        } catch (err) {
            console.error('Erreur de connexion:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Image de fond (peut être remplacée par une image réelle ou un dégradé) */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-9be2-e23c215729af/82d90708-306c-482a-a53d-d039fdd05476/FR-fr-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg')" }}
            ></div>

            {/* Contenu du formulaire */}
            <div className="relative z-10 bg-black bg-opacity-75 p-16 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-white text-3xl font-bold mb-8">Se connecter</h1>

                {error && (
                    <div className="bg-red-700 text-white p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-800"
                    >
                        Se connecter
                    </button>
                </form>

                <div className="mt-8 text-gray-500 text-sm">
                    Nouveau sur Media243 ?{' '}
                    <Link to="/signup" className="text-white hover:underline">
                        Inscrivez-vous maintenant
                    </Link>
                    .
                </div>
                {/* Vous pouvez ajouter une option "Se souvenir de moi" et "Besoin d'aide ?" */}
            </div>
        </div>
    );
};

export default LoginPage;