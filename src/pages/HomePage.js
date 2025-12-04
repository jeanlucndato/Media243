// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Row from '../components/Row';
import Footer from '../components/Footer';
import mainbanner from '../assets/images/mainbanner.png';
import { useMedia } from '../contexts/MediaContext';
import './HomePage.css';

const HERO_MEDIA_ID = 1;

const HomePage = () => {
    const navigate = useNavigate();
    const { categories, heroMedia: contextHeroMedia, loading, error } = useMedia();

    const heroMedia = contextHeroMedia || {
        id: HERO_MEDIA_ID,
        title: "Chargement...",
        description: "Veuillez patienter pendant le chargement du contenu.",
        backgroundImage: `url(${mainbanner})`,
    };

    const handleMoreInfoClick = () => {
        navigate(`/media/${heroMedia.id}`);
    };

    const handleWatchClick = () => {
        console.log("Démarrer la lecture du média : ", heroMedia.id);
        navigate(`/media/${heroMedia.id}`);
    };

    if (loading) {
        return (
            <div className="home-page__loading">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-page__error">
                <div className="home-page__error-content">
                    <h1 className="home-page__error-title">Une erreur est survenue</h1>
                    <p className="home-page__error-message">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="home-page__error-btn"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Header />

            {/* Bannière principale */}
            <section
                className="home-page__hero"
                style={{
                    backgroundImage: heroMedia.backgroundImage,
                    backgroundPosition: "center top"
                }}
            >
                {/* Gradient Overlays */}
                <div className="home-page__hero-gradient-v"></div>
                <div className="home-page__hero-gradient-h"></div>

                <div className="home-page__hero-content">
                    {/* Titre */}
                    <h1 className="home-page__hero-title">
                        {heroMedia.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="home-page__hero-meta">
                        <span className="home-page__hero-match">98% Match</span>
                        <span>2024</span>
                        <span className="home-page__hero-rating">16+</span>
                        <span>2h 15m</span>
                    </div>

                    {/* Description */}
                    <p className="home-page__hero-description">
                        {heroMedia.description}
                    </p>

                    {/* Boutons */}
                    <div className="home-page__hero-buttons">
                        <button
                            onClick={handleWatchClick}
                            className="home-page__hero-btn home-page__hero-btn--play"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Lecture
                        </button>
                        <button
                            onClick={handleMoreInfoClick}
                            className="home-page__hero-btn home-page__hero-btn--info"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Plus d'infos
                        </button>
                    </div>
                </div>
            </section>

            {/* Lignes de contenu */}
            <main className="home-page__content">
                {
                    categories.map((category, index) => (
                        <Row
                            key={index}
                            title={category.title}
                            mediaList={category.mediaList}
                        />
                    ))
                }
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;