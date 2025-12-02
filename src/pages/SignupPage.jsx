import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// IMPORT du Header
import Header from '../components/Header';
// import de l'images
import bgImage from '../assets/images/mainbanner.png';
import useMedia243Api from '../hooks/useMedia243Api';

const SignupPage = () => {
    // NOUVEAUX CHAMPS D'ÉTAT AJOUTÉS
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Champ confirmation
    const [gender, setGender] = useState(''); // Champ genre
    const [dateOfBirth, setDateOfBirth] = useState(''); // Champ Date de naissance

    const navigate = useNavigate();

    // Utilisation du hook qui gère la logique API
    const { loading, error: apiError, signup } = useMedia243Api();

    // Un état local pour capturer l'erreur (e.g. confirmation de mot de passe)
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(''); // Réinitialiser l'erreur locale

        // Validation locale pour la confirmation du mot de passe
        if (password !== confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas. Veuillez vérifier.');
            return; // Arrêter la soumission si les mots de passe sont différents
        }

        try {
            // Passez toutes les données d'inscription au hook API
            await signup({
                username,
                email,
                password,
                gender,
                dateOfBirth,
            });

            // L'inscription réussit, on redirige vers la connexion
            console.log('Inscription réussie. Redirection vers la page de connexion.');
            navigate('/login');

        } catch (err) {
            // Le hook useMedia243Api met déjà à jour apiError
            if (!apiError) {
                setLocalError('Échec de l\'inscription. Veuillez réessayer.');
            }
        }
    };

    const displayError = apiError || localError;

    return (
        // 💡 Le conteneur principal reste min-h-screen
        <div className="relative min-h-screen flex flex-col bg-gray-900 overflow-hidden">

            {/* 💡 AJOUT DU HEADER ICI */}
            <Header /> <br /><br />

            {/* Image de fond (doit rester en absolute) */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            {/* Conteneur pour centrer le formulaire */}
            <div className="flex-grow flex items-center justify-center py-16">
                {/* Contenu du formulaire : ajustement du p-16 en p-8 sm:p-16 pour l'espace */}
                <div className="relative z-10 bg-black bg-opacity-75 p-8 sm:p-16 rounded-lg shadow-xl w-full max-w-md">
                    <h1 className="text-white text-3xl font-bold mb-8 text-center">Créez votre compte Media243</h1>

                    {/* Affichage de l'erreur */}
                    {displayError && (
                        <div className="bg-red-700 text-white p-3 rounded mb-4 text-sm">
                            {displayError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* CHAMP NOM D'UTILISATEUR */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* CHAMP EMAIL */}
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Adresse e-mail"
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* CHAMP MOT DE PASSE */}
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Créer un mot de passe"
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* CHAMP CONFIRMATION DU MOT DE PASSE */}
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* CHAMP GENRE (SELECT) */}
                        <div className="mb-4">
                            <select
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled className='text-gray-400'>Sélectionner votre genre</option>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        {/* CHAMP DATE DE NAISSANCE (INPUT TYPE DATE) */}
                        <div className="mb-6">
                            <input
                                type="date"
                                placeholder="Date de naissance"
                                className="w-full p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
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

                    <div className="mt-8 text-gray-500 text-sm text-center">
                        Déjà membre ?{' '}
                        <Link to="/login" className="text-white hover:underline">
                            Connectez-vous ici
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;