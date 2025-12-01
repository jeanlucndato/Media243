import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import de l'images
import bgImage from '../assets/images/mainbanner.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 🔑 CORRECTION 1: L'URL doit pointer vers l'instance Next.js (port 3000 par défaut)
    // et vers le point de terminaison de l'API: /api/auth
    // ASSUREZ-VOUS QUE 3000 EST LE PORT SUR LEQUEL TOURNE VOTRE NEXT.JS.
    const API_URL = 'http://localhost:3000/api/auth';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // 🔑 CORRECTION 2: Nous faisons un appel POST à /api/auth 
            // et incluons l'action 'login' dans le corps (body) de la requête.
            const response = await axios.post(API_URL, {
                action: 'login', // L'action attendue par votre pages/api/auth.js
                email,
                password,
            });

            // Si la connexion réussit (status 200)
            console.log('Connexion réussie:', response.data);

            // Stockez le token de session simulé de votre API Next.js
            localStorage.setItem('token', response.data.token);

            // Redirigez l'utilisateur
            navigate('/');

        } catch (err) {
            console.error('Erreur de connexion:', err);

            // L'API auth.js renvoie l'erreur dans err.response.data.message
            const errorMessage = err.response?.data?.message || 'Une erreur inattendue est survenue lors de la connexion.';
            setError(errorMessage);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Image de fond (peut être remplacée par une image réelle ou un dégradé) */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${bgImage})` }}
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
            </div>
        </div>
    );
};

export default LoginPage;