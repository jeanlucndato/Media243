import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { useAuth } from '../contexts/AuthContext';
import { FaPlay, FaStar, FaInfoCircle, FaCalendarAlt, FaClock } from 'react-icons/fa'; // Ajout de nouvelles icônes
import { MdOutlinePeopleAlt, MdOutlineLocalMovies } from 'react-icons/md';

// --- MOCK : Fonction de récupération des données par ID (LOCAL) ---
// (Le mock reste inchangé pour le fonctionnement)
const fetchMediaDetails = async (mediaId) => {
    // Simuler un appel API et le temps de chargement
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
        posterUrl: 'https://via.placeholder.com/1920x1080/1A1A1A/FFFFFF?text=Détail+Banner', // 16:9 ratio, meilleure pour les bannières
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

// --- Composant Principal ---
const DetailPage = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(1);

    const hasActiveSubscription = isAuthenticated && user?.subscription === 'premium';

    // ... LOGIQUE DE RÉCUPÉRATION DES DONNÉES (inchangée) ...
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
        return <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">Chargement des détails...</div>;
    }

    if (error || !media) {
        return <div className="min-h-screen bg-black text-white p-10 text-red-500">Erreur : {error || 'Média non trouvé.'}</div>;
    }

    const currentSeason = media.seasons ? media.seasons.find(s => s.number === selectedSeason) : null;
    const videoJsOptions = {
        autoplay: true, controls: true, responsive: true, fluid: true,
        sources: [{ src: media.videoUrl, type: 'application/x-mpegURL' }],
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />

            {/* SECTION BANNIÈRE / LECTEUR - DESIGN OPTIMISÉ */}
            <section className={`relative w-full ${showPlayer ? 'h-auto' : 'h-[90vh] md:h-[calc(100vh-64px)]'}`}>

                {/* 1. Lecteur Vidéo */}
                {showPlayer && hasActiveSubscription ? (
                    <div className="w-full aspect-video bg-black">
                        {/* Assurez-vous que votre Header est bien fixé en haut pour ne pas gêner */}
                        <VideoPlayer options={videoJsOptions} onReady={() => { /* Logique */ }} />
                    </div>
                ) : (
                    // 2. Bannière de Détail (Plus immersive)
                    <div
                        className="h-full bg-cover bg-top flex items-end"
                        style={{ backgroundImage: `url(${media.posterUrl})` }}
                    >
                        {/* Gradient plus prononcé pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                        <div className="relative z-10 max-w-5xl p-6 md:p-12 lg:p-20">
                            <h1 className="text-5xl md:text-8xl font-black mb-4 drop-shadow-2xl leading-tight">
                                {media.title}
                            </h1>

                            {/* Informations clés (Style plus NETFLIX/PRIME) */}
                            <div className="flex items-center space-x-6 text-xl mb-6 font-semibold">
                                <span className="text-green-500 text-2xl font-bold">{media.rating || 'N/A'} <FaStar className="inline ml-1 text-yellow-400 text-base" /></span>
                                <span className="text-gray-400">{media.releaseYear || 'N/A'}</span>
                                <span className="text-gray-400 hidden sm:block border border-gray-500 px-2 rounded-md text-sm">{media.duration || 'N/A'}</span>
                                <span className="text-gray-400 hidden lg:block">{media.genre || 'N/A'}</span>
                            </div>

                            <p className="max-w-3xl text-gray-200 text-lg md:text-xl mb-8">
                                {media.description}
                            </p>

                            {/* Actions (Boutons) */}
                            <div className="flex space-x-4">
                                {hasActiveSubscription ? (
                                    <button
                                        onClick={() => setShowPlayer(true)}
                                        className="flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-xl font-bold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                                    >
                                        <FaPlay className="mr-3 text-xl" /> Lire le média
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => !isAuthenticated ? window.location.href = '/login' : console.log("Afficher modal Abonnement")}
                                        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-xl font-bold rounded-full transition duration-300"
                                    >
                                        <FaInfoCircle className="mr-3 text-xl" /> S'abonner pour regarder
                                    </button>
                                )}
                                {/* Bouton "Ajouter à ma liste" (facultatif) */}
                                <button className="border-2 border-gray-600 text-white px-6 py-3 text-xl font-semibold rounded-full hover:bg-gray-700 transition duration-300 hidden md:flex items-center">
                                    + Ma Liste
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* SECTION DES MÉTA-DONNÉES ET ÉPISODES (SI C'EST UNE SÉRIE) - DESIGN OPTIMISÉ */}
            <main className={`p-6 md:p-12 lg:p-20 ${showPlayer ? 'mt-0' : '-mt-20'}`}>

                {/* Résumé détaillé */}
                <div className='max-w-5xl mb-10'>
                    <h2 className="text-3xl font-bold mb-4">Synopsis détaillé</h2>
                    <p className="text-gray-300 text-lg">{media.longDescription || media.description}</p>
                </div>


                <h2 className="text-3xl font-bold mb-6">Informations principales</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 border-t border-gray-700 pt-6">

                    {/* Colonne 1 : Infos Clés */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                            <MdOutlineLocalMovies className="text-red-500 mr-3 text-xl" />
                            <p><strong className="text-white">Genres :</strong> {media.genre}</p>
                        </div>
                        <div className="flex items-center">
                            <FaCalendarAlt className="text-red-500 mr-3 text-xl" />
                            <p><strong className="text-white">Année de sortie :</strong> {media.releaseYear}</p>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="text-red-500 mr-3 text-xl" />
                            <p><strong className="text-white">Durée :</strong> {media.duration}</p>
                        </div>
                    </div>

                    {/* Colonne 2 : Acteurs */}
                    <div className="md:col-span-2">
                        <div className="flex items-start">
                            <MdOutlinePeopleAlt className="text-red-500 mr-3 text-xl mt-1" />
                            <p><strong className="text-white block">Distribution :</strong> {media.actors}</p>
                        </div>
                    </div>
                </div>

                {/* Gestion des Saisons et Épisodes (pour les séries) - DESIGN OPTIMISÉ */}
                {media.isSeries && currentSeason && (
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                            <h3 className="text-3xl text-white font-bold">Épisodes</h3>
                            {/* Sélecteur de Saison (Plus Stylé) */}
                            <select
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                                className="bg-gray-800 text-white p-3 rounded-lg cursor-pointer border-2 border-gray-700 hover:border-red-600 transition"
                            >
                                {media.seasons.map(s => (
                                    <option key={s.number} value={s.number}>Saison {s.number}</option>
                                ))}
                            </select>
                        </div>

                        {/* Liste des Épisodes (Mieux Formatée) */}
                        <ul className="space-y-3">
                            {currentSeason.episodes.map((episode, index) => (
                                <li
                                    key={episode.id}
                                    className="p-4 bg-gray-800 hover:bg-gray-700/80 rounded-xl flex flex-col md:flex-row items-start md:items-center cursor-pointer transition duration-300"
                                    onClick={() => { /* Optionnel: Mettre à jour l'épisode à lire */ }}
                                >
                                    {/* Vignette (Placeholder pour une vignette d'épisode) */}
                                    <div className="w-full md:w-48 aspect-video bg-gray-900 rounded-lg mr-4 flex items-center justify-center text-gray-500 flex-shrink-0 mb-3 md:mb-0">

                                    </div>

                                    <div className="flex-grow">
                                        <p className="text-white font-bold text-lg mb-1">{index + 1}. {episode.title}</p>
                                        <p className="text-sm text-gray-400 mb-2">{episode.synopsis}</p>
                                        <span className="text-xs text-red-400 font-medium border border-red-400 px-2 py-1 rounded-full">{episode.duration}</span>
                                    </div>

                                    {/* Bouton de Lecture d'Épisode */}
                                    <button onClick={() => setShowPlayer(true)} className="text-red-600 hover:text-red-500 transition mt-3 md:mt-0 md:ml-4 flex-shrink-0">
                                        <FaPlay className='text-3xl' />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* 💡 Vous pouvez ajouter ici la section "Contenu similaire" */}
            </main>

            <Footer />
        </div>
    );
};

export default DetailPage;