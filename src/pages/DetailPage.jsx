import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { useAuth } from '../contexts/AuthContext';
import { FaPlay, FaStar, FaInfoCircle, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { MdOutlinePeopleAlt, MdOutlineLocalMovies } from 'react-icons/md';
import './DetailPage.css';

// Mock function for fetching media details
const fetchMediaDetails = async (mediaId) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        id: mediaId,
        title: "Le Destin des Grands Lacs : Saison 1",
        description: "En 1996, une famille de Goma est déchirée par les événements. Un drame poignant sur la résilience, la culture et l'espoir au cœur de l'Afrique Centrale.",
        longDescription: "Découvrez l'histoire fascinante de l'Est du Congo, à travers les yeux de deux frères séparés par la guerre mais unis par l'amour de leur terre. Un récit épique de courage et de pardon.",
        genre: "Drame, Historique",
        rating: 9.4,
        duration: "5 Épisodes (50 min)",
        releaseYear: 2024,
        actors: "Acteur 1, Acteur 2, Acteur 3",
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        posterUrl: 'https://via.placeholder.com/1920x1080/1A1A1A/FFFFFF?text=Détail+Banner',
        isSeries: true,
        seasons: [
            {
                number: 1, episodes: [
                    { id: 101, title: 'Le Réveil', duration: '52 min', synopsis: 'Le début de la crise qui sépare la famille.' },
                    { id: 102, title: 'L\'Exode', duration: '48 min', synopsis: 'Le voyage périlleux à travers les forêts du Kivu.' },
                    { id: 103, title: 'La Résilience', duration: '55 min', synopsis: 'Retrouvailles inattendues et espoir renaissant.' },
                ]
            }
        ]
    };
};

const DetailPage = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(1);

    const hasActiveSubscription = isAuthenticated && user?.subscription === 'premium';

    useEffect(() => {
        const loadMedia = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchMediaDetails(id);
                setMedia(data);
                if (data.isSeries && data.seasons.length > 0) {
                    setSelectedSeason(data.seasons[0].number);
                }
            } catch (err) {
                setError("Erreur de chargement du média. Veuillez vérifier la connexion.");
            } finally {
                setLoading(false);
            }
        };

        loadMedia();
    }, [id]);

    if (loading) {
        return <div className="detail-page__loading">Chargement des détails...</div>;
    }

    if (error || !media) {
        return <div className="detail-page__error">Erreur : {error || 'Média non trouvé.'}</div>;
    }

    const currentSeason = media.seasons ? media.seasons.find(s => s.number === selectedSeason) : null;
    const videoJsOptions = {
        autoplay: true, controls: true, responsive: true, fluid: true,
        sources: [{ src: media.videoUrl, type: 'application/x-mpegURL' }],
    };

    return (
        <div className="detail-page">
            <Header />

            {/* Hero Section / Video Player */}
            <section className={`detail-page__hero ${showPlayer ? 'with-player' : ''}`}>

                {/* Video Player */}
                {showPlayer && hasActiveSubscription ? (
                    <div className="detail-page__video-container">
                        <VideoPlayer options={videoJsOptions} onReady={() => { /* Logic */ }} />
                    </div>
                ) : (
                    // Banner
                    <div
                        className="detail-page__banner"
                        style={{ backgroundImage: `url(${media.posterUrl})` }}
                    >
                        {/* Gradient Overlay */}
                        <div className="detail-page__banner-gradient"></div>

                        <div className="detail-page__banner-content">
                            <h1 className="detail-page__title">
                                {media.title}
                            </h1>

                            {/* Metadata */}
                            <div className="detail-page__meta">
                                <span className="detail-page__rating">
                                    {media.rating || 'N/A'} <FaStar />
                                </span>
                                <span className="detail-page__year">{media.releaseYear || 'N/A'}</span>
                                <span className="detail-page__age-rating">{media.duration || 'N/A'}</span>
                                <span className="detail-page__genre">{media.genre || 'N/A'}</span>
                            </div>

                            <p className="detail-page__description">
                                {media.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="detail-page__actions">
                                {hasActiveSubscription ? (
                                    <button
                                        onClick={() => setShowPlayer(true)}
                                        className="detail-page__btn detail-page__btn--play"
                                    >
                                        <FaPlay /> Lire le média
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => !isAuthenticated ? window.location.href = '/login' : console.log("Afficher modal Abonnement")}
                                        className="detail-page__btn detail-page__btn--subscribe"
                                    >
                                        <FaInfoCircle /> S'abonner pour regarder
                                    </button>
                                )}
                                <button className="detail-page__btn detail-page__btn--list">
                                    + Ma Liste
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Content Section */}
            <main className={`detail-page__content ${showPlayer ? 'with-player' : 'no-player'}`}>

                {/* Synopsis */}
                <div className="detail-page__synopsis">
                    <h2 className="detail-page__synopsis-title">Synopsis détaillé</h2>
                    <p className="detail-page__synopsis-text">{media.longDescription || media.description}</p>
                </div>

                <h2 className="detail-page__info-title">Informations principales</h2>

                <div className="detail-page__info-grid">
                    {/* Column 1: Key Info */}
                    <div className="detail-page__info-item">
                        <div className="detail-page__info-row">
                            <MdOutlineLocalMovies className="detail-page__info-icon" />
                            <p><strong className="detail-page__info-label">Genres :</strong> {media.genre}</p>
                        </div>
                        <div className="detail-page__info-row">
                            <FaCalendarAlt className="detail-page__info-icon" />
                            <p><strong className="detail-page__info-label">Année de sortie :</strong> {media.releaseYear}</p>
                        </div>
                        <div className="detail-page__info-row">
                            <FaClock className="detail-page__info-icon" />
                            <p><strong className="detail-page__info-label">Durée :</strong> {media.duration}</p>
                        </div>
                    </div>

                    {/* Column 2: Actors */}
                    <div className="detail-page__info-item">
                        <div className="detail-page__info-row">
                            <MdOutlinePeopleAlt className="detail-page__info-icon" />
                            <p><strong className="detail-page__info-label">Distribution :</strong> {media.actors}</p>
                        </div>
                    </div>
                </div>

                {/* Episodes Section */}
                {media.isSeries && currentSeason && (
                    <div className="detail-page__episodes">
                        <div className="detail-page__episodes-header">
                            <h3 className="detail-page__episodes-title">Épisodes</h3>
                            <select
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                                className="detail-page__season-select"
                            >
                                {media.seasons.map(s => (
                                    <option key={s.number} value={s.number}>Saison {s.number}</option>
                                ))}
                            </select>
                        </div>

                        {/* Episode List */}
                        <ul className="detail-page__episode-list">
                            {currentSeason.episodes.map((episode, index) => (
                                <li
                                    key={episode.id}
                                    className="detail-page__episode"
                                    onClick={() => { /* Update episode to play */ }}
                                >
                                    {/* Thumbnail */}
                                    <div className="detail-page__episode-thumbnail">
                                    </div>

                                    <div className="detail-page__episode-info">
                                        <p className="detail-page__episode-title">{index + 1}. {episode.title}</p>
                                        <p className="detail-page__episode-synopsis">{episode.synopsis}</p>
                                        <span className="detail-page__episode-duration">{episode.duration}</span>
                                    </div>

                                    {/* Play Button */}
                                    <button onClick={() => setShowPlayer(true)} className="detail-page__episode-play">
                                        <FaPlay />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default DetailPage;