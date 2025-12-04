import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import bgImage from '../assets/images/mainbanner.png';
import useMedia243Api from '../hooks/useMedia243Api';
import './SignupPage.css';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const navigate = useNavigate();
    const { loading, error: apiError, signup } = useMedia243Api();
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (password !== confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas. Veuillez vérifier.');
            return;
        }

        try {
            await signup({
                username,
                email,
                password,
                gender,
                dateOfBirth,
            });

            console.log('Inscription réussie. Redirection vers la page de connexion.');
            navigate('/login');

        } catch (err) {
            if (!apiError) {
                setLocalError('Échec de l\'inscription. Veuillez réessayer.');
            }
        }
    };

    const displayError = apiError || localError;

    return (
        <div className="signup-page">
            <Header />
            <br /><br />

            {/* Image de fond */}
            <div
                className="signup-page__background"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            {/* Conteneur pour centrer le formulaire */}
            <div className="signup-page__content">
                <div className="signup-page__form-container">
                    <h1 className="signup-page__title">Créez votre compte Media243</h1>

                    {displayError && (
                        <div className="signup-page__error">
                            {displayError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="signup-page__form">
                        <div className="signup-page__input-group">
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                className="signup-page__input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-page__input-group">
                            <input
                                type="email"
                                placeholder="Adresse e-mail"
                                className="signup-page__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-page__input-group">
                            <input
                                type="password"
                                placeholder="Créer un mot de passe"
                                className="signup-page__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-page__input-group">
                            <input
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                className="signup-page__input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-page__input-group">
                            <select
                                className="signup-page__select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled>Sélectionner votre genre</option>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div className="signup-page__input-group">
                            <input
                                type="date"
                                placeholder="Date de naissance"
                                className="signup-page__input"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="signup-page__submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </button>
                    </form>

                    <div className="signup-page__footer">
                        Déjà membre ?{' '}
                        <Link to="/login" className="signup-page__footer-link">
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