// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    // ... (Logique inchangée) ...
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            return setError("Le mot de passe doit contenir au moins 6 caractères.");
        }
        try {
            await signup(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue lors de l\'inscription.');
        }
    };

    return (
        // RENDER: min-h-screen sur tout l'écran
        <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">

            <form
                onSubmit={handleSubmit}
                className="
                    bg-gray-900/90 
                    p-6 md:p-12 // Moins de padding sur mobile, plus sur desktop
                    rounded-lg shadow-2xl 
                    w-full max-w-sm md:max-w-md // Taille max ajustée
                    mx-auto
                "
            >
                <h2 className="text-white text-3xl font-bold mb-6 md:mb-8">
                    Créer votre compte media243
                </h2>

                {error && (
                    <p className="text-red-600 mb-4 p-3 bg-red-900/20 rounded text-sm">
                        {error}
                    </p>
                )}

                {/* Champs de formulaire */}
                <input
                    type="text"
                    placeholder="Nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-4 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-base"
                />
                <input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-base"
                />
                <input
                    type="password"
                    placeholder="Mot de passe (6 caractères min.)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-4 mb-6 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-base"
                />

                {/* Bouton S'inscrire */}
                <button
                    type="submit"
                    className="w-full p-4 mb-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md transition"
                >
                    S'inscrire
                </button>

                {/* Lien de Connexion */}
                <p className="text-gray-400 text-sm mt-4 text-center">
                    Déjà membre ?
                    <a
                        href="/login"
                        className="text-white hover:underline ml-1 font-semibold"
                    >
                        Connectez-vous ici
                    </a>
                </p>

            </form>
        </div>
    );
};

export default SignupPage;