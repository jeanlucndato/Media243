// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

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
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>

            {/* Logo et Navigation */}
            <div className="header__left">
                <Link to="/" className="header__logo">
                    <h1>
                        MEDIA<span>243</span>
                    </h1>
                </Link>
                <nav className="header__nav">
                    <Link to="/">Accueil</Link>
                    <a href="#" className="inactive">Séries</a>
                    <a href="#" className="inactive">Films</a>
                    <a href="#" className="inactive">Nouveautés</a>
                    <a href="#" className="inactive">Ma liste</a>
                </nav>
            </div>

            {/* Profil et Actions */}
            <div className="header__right">
                {/* Search Bar */}
                <div className={`header__search ${showSearch ? 'active' : ''}`}>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Titres, personnes, genres"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <button onClick={() => setShowSearch(!showSearch)} className="header__icon-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Notification Icon Placeholder */}
                <button className="header__icon-btn notification">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {isAuthenticated ? (
                    <div className="header__profile">
                        <div className="header__avatar"></div>
                        <button onClick={logout} className="header__logout-btn">
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="header__login-btn">
                        S'identifier
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;