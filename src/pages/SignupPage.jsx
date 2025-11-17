import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Assurez-vous que le chemin est correct selon l'arborescence de votre projet
import useMedia243Api from '../hooks/useMedia243Api';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Utilisation du hook qui gère la logique API
    const { loading, error: apiError, signup } = useMedia243Api();

    // Un état local pour capturer l'erreur si elle n'est pas gérée par le hook (e.g. erreur inattendue)
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(''); // Réinitialiser l'erreur locale

        try {
            await signup({ email, password });

            // L'inscription réussit, on redirige vers la connexion
            console.log('Inscription réussie. Redirection vers la page de connexion.');
            navigate('/login');

        } catch (err) {
            // Le hook useMedia243Api met déjà à jour apiError, mais on peut ajouter un message de fallback ici
            if (!apiError) {
                setLocalError('Échec de l\'inscription. Veuillez réessayer.');
            }
        }
    };

    const displayError = apiError || localError;

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Image de fond */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-9be2-e23c215729af/82d90708-306c-482a-a53d-d039fdd05476/FR-fr-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg')" }}
            ></div>

            {/* Contenu du formulaire */}
            <div className="relative z-10 bg-black bg-opacity-75 p-16 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-white text-3xl font-bold mb-8">S'inscrire</h1>

                {/* Affichage de l'erreur */}
                {displayError && (
                    <div className="bg-red-700 text-white p-3 rounded mb-4 text-sm">
                        {displayError}
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
                            placeholder="Créer un mot de passe"
                            className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Le bouton est désactivé pendant le chargement */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-800 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                <div className="mt-8 text-gray-500 text-sm">
                    Déjà membre ?{' '}
                    <Link to="/login" className="text-white hover:underline">
                        Connectez-vous ici
                    </Link>
                    .
                </div>
            </div>
        </div>
    );
};

export default SignupPage;