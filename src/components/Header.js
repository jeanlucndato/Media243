// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Pour afficher le profil ou le bouton Logout
import { Link } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    // La classe 'fixed top-0 z-50' est essentielle pour l'effet Netflix
    return (
        <header className="fixed top-0 z-50 w-full flex items-center justify-between p-6 bg-black/70 transition duration-300">

            {/* Logo et Navigation */}
            <div className="flex items-center space-x-10">
                <Link to="/">
                    <h1 className="text-red-600 text-3xl font-extrabold cursor-pointer">
                        MEDIA<span className="text-white">243</span>
                    </h1>
                </Link>
                <nav className="hidden lg:flex space-x-6 text-sm">
                    <Link to="/" className="text-white hover:text-gray-300 transition">Accueil</Link>
                    <a href="#" className="text-gray-400 hover:text-white transition">Séries</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Films</a>
                    <a href="/DetailPage" className="text-gray-400 hover:text-white transition">Detailles</a>
                </nav>
            </div>

            {/* Profil et Actions */}
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <button className="text-white hover:text-gray-300 transition">
                            {/*  */}

                        </button>
                        <button onClick={logout} className="text-sm text-gray-400 hover:text-red-600 transition">
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-red-700 transition">
                            Connexion
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;