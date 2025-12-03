// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Pour afficher le profil ou le bouton Logout
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    return (
        <header className={`fixed top-0 z-50 w-full flex items-center justify-between p-4 md:p-6 transition-all duration-500 ${isScrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>

            {/* Logo et Navigation */}
            <div className="flex items-center space-x-8 md:space-x-10">
                <Link to="/">
                    <h1 className="text-netflix-red text-2xl md:text-4xl font-extrabold cursor-pointer tracking-tighter">
                        MEDIA<span className="text-white">243</span>
                    </h1>
                </Link>
                <nav className="hidden lg:flex space-x-6 text-sm font-medium">
                    <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Accueil</Link>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300">Séries</a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300">Films</a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300">Nouveautés</a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300">Ma liste</a>
                </nav>
            </div>

            {/* Profil et Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 text-white text-sm font-medium">
                {/* Search Bar */}
                <div className={`flex items-center border border-white bg-black/50 transition-all duration-300 ${showSearch ? 'w-64 px-2 py-1' : 'w-0 border-transparent bg-transparent overflow-hidden'}`}>
                    <form onSubmit={handleSearchSubmit} className="w-full">
                        <input
                            type="text"
                            placeholder="Titres, personnes, genres"
                            className={`bg-transparent text-white text-sm outline-none w-full ${showSearch ? 'block' : 'hidden'}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <button onClick={() => setShowSearch(!showSearch)} className="hover:text-gray-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Notification Icon Placeholder */}
                <button className="hidden sm:block hover:text-gray-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-netflix-red rounded cursor-pointer"></div> {/* Avatar Placeholder */}
                        <button onClick={logout} className="text-gray-300 hover:text-white transition">
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="bg-netflix-red text-white px-4 py-1.5 text-sm font-semibold rounded hover:bg-red-700 transition duration-300">
                            S'identifier
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;