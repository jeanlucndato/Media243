import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import bgImage from '../assets/images/mainbanner.png';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3000/api') + '/auth';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(API_URL, {
                action: 'login',
                email,
                password,
            });

            console.log('Connexion réussie:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');

        } catch (err) {
            console.error('Erreur de connexion:', err);
            const errorMessage = err.response?.data?.message || 'Une erreur inattendue est survenue lors de la connexion.';
            setError(errorMessage);
        }
    };

    return (
        <>
            <div className="login-page">
                <Header />
                <br /><br /><br />

                {/* Image de fond */}
                <div
                    className="login-page__background"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>

                {/* Contenu du formulaire */}
                <div className="login-page__form-container">
                    <h1 className="login-page__title">Se connecter</h1>

                    {error && (
                        <div className="login-page__error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-page__form">
                        <div className="login-page__input-group">
                            <input
                                type="email"
                                placeholder="Adresse e-mail"
                                className="login-page__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-page__input-group">
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className="login-page__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-page__submit-btn"
                        >
                            Se connecter
                        </button>
                    </form>

                    <div className="login-page__footer">
                        Nouveau sur Media243 ?{' '}
                        <Link to="/signup" className="login-page__footer-link">
                            Inscrivez-vous maintenant
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;