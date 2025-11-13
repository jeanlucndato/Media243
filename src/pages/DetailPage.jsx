import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { useAuth } from '../contexts/AuthContext';
import { FaPlay, FaStar } from 'react-icons/fa'; // Assurez-vous d'avoir installé react-icons

// --- MOCK : Fonction de récupération des données par ID (LOCAL) ---
// Simule le comportement que ferait votre API backend
const fetchMediaDetails = async (mediaId) => {
    // Simuler un appel API et le temps de chargement
    await new Promise(resolve => setTimeout(resolve, 500));

    // Données fictives pour un média. 
    // ATTENTION : L'ID '1' est utilisé ici pour le mock, mais en réalité, 
    // cette fonction devrait retourner des données basées sur 'mediaId'.
    return {
        id: mediaId,
        title: "Le Destin des Grands Lacs : Saison 1",
        description: "En 1996, une famille de Goma est déchirée par les événements. Un drame poignant sur la résilience, la culture et l'espoir au cœur de l'Afrique Centrale.",
        genre: "Drame, Historique",
        rating: 9.4,
        duration: "5 Épisodes (50 min)",
        releaseYear: 2024,
        actors: "Acteur 1, Acteur 2, Acteur 3",
        // Remplacez par une URL de test si vous avez un lecteur vidéo qui fonctionne
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        posterUrl: 'https://via.placeholder.com/1280x720/1A1A1A/FFFFFF?text=Détail+Banner',
        // Ajoutez des données sur les saisons et épisodes si c'est une série
        isSeries: true,
        seasons: [
            {
                number: 1, episodes: [
                    { id: 101, title: 'Épisode 1 : Le Réveil', duration: '52 min' },
                    { id: 102, title: 'Épisode 2 : L\'Exode', duration: '48 min' },
                    { id: 103, title: 'Épisode 3 : La Résilience', duration: '55 min' },
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
    const [selectedSeason, setSelectedSeason] = useState(1); // Pour la gestion des séries

    // Simuler l'état d'abonnement (le Backend doit renvoyer cette info dans 'user')
    const hasActiveSubscription = isAuthenticated && user?.subscription === 'premium';

    // --- LOGIQUE DE RÉCUPÉRATION DES DONNÉES LOCALES ---
    useEffect(() => {
        const loadMedia = async () => {
            setLoading(true);
            setError(null);
            try {
                // Utilisation du MOCK local
                const data = await fetchMediaDetails(id);
                setMedia(data);
                // Si c'est une série, initialiser la saison à la première disponible
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


    // --- Configurations du Lecteur Vidéo ---
    const videoJsOptions = {
        autoplay: true, controls: true, responsive: true, fluid: true,
        // Utilisez l'URL du média ou d'un épisode sélectionné
        sources: [{ src: media.videoUrl, type: 'application/x-mpegURL' }],
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Header />

            {/* SECTION BANNIÈRE / LECTEUR */}
            <section
                className={`relative w-full ${showPlayer ? 'h-auto' : 'h-[90vh] md:h-screen pt-20'}`}
                style={!showPlayer ? { backgroundImage: `url(${media.posterUrl})` } : {}}
            >
                {showPlayer && hasActiveSubscription ? (
                    // 1. Lecteur Vidéo
                    <div className="w-full aspect-video bg-black">
                        <VideoPlayer options={videoJsOptions} onReady={() => { /* Logique de progression */ }} />
                    </div>
                ) : (
                    // 2. Bannière de Détail
                    <div className="h-full bg-cover bg-center flex items-end">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="relative z-10 max-w-4xl p-8 md:p-12">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">{media.title}</h1>

                            {/* Informations clés */}
                            <div className="flex items-center space-x-4 text-lg mb-6">
                                <span className="text-green-400 font-bold">{media.releaseYear || 'N/A'}</span>
                                <span className="border border-gray-400 px-2 rounded text-sm">{media.duration || 'N/A'}</span>
                                <span className="flex items-center text-yellow-500"><FaStar className="mr-1" /> {media.rating || 'N/A'}</span>
                                <span className="text-gray-400 hidden sm:block">{media.genre || 'N/A'}</span>
                            </div>

                            <p className="max-w-xl text-gray-300 text-xl mb-8">
                                {media.description}
                            </p>

                            {/* Actions (Boutons) */}
                            {hasActiveSubscription ? (
                                <button
                                    onClick={() => setShowPlayer(true)}
                                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-xl font-bold rounded-lg transition"
                                >
                                    <FaPlay className="mr-2" /> Lire le média
                                </button>
                            ) : (
                                <button
                                    onClick={() => !isAuthenticated ? window.location.href = '/login' : console.log("Afficher modal Abonnement")}
                                    className="flex items-center bg-white text-black px-8 py-3 text-xl font-bold rounded-lg hover:bg-gray-200 transition"
                                >
                                    S'abonner pour regarder
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* SECTION DES MÉTA-DONNÉES ET ÉPISODES (SI C'EST UNE SÉRIE) */}
            <main className={`p-8 md:p-12 ${showPlayer ? 'mt-0' : '-mt-20'}`}>
                <h2 className="text-2xl font-bold mb-6">À propos de {media.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">

                    {/* Colonne 1 : Infos Générales */}
                    <div className="md:col-span-1">
                        <p className="mb-2"><strong className="text-white">Genres :</strong> {media.genre}</p>
                        <p className="mb-2"><strong className="text-white">Acteurs :</strong> {media.actors}</p>
                        <p className="mb-2"><strong className="text-white">Année :</strong> {media.releaseYear}</p>
                    </div>

                    {/* Colonne 2 & 3 : Gestion des Saisons et Épisodes (pour les séries) */}
                    {media.isSeries && currentSeason && (
                        <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-semibold text-xl">Saison {selectedSeason}</h3>
                                {/* Sélecteur de Saison */}
                                <select
                                    value={selectedSeason}
                                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                                    className="bg-gray-700 text-white p-2 rounded cursor-pointer focus:ring-red-600 focus:border-red-600"
                                >
                                    {media.seasons.map(s => (
                                        <option key={s.number} value={s.number}>Saison {s.number}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Liste des Épisodes */}
                            <ul className="space-y-4">
                                {currentSeason.episodes.map(episode => (
                                    <li
                                        key={episode.id}
                                        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center cursor-pointer transition"
                                    >
                                        <div>
                                            <p className="text-white font-semibold">{episode.id}. {episode.title}</p>
                                            <p className="text-sm text-gray-400">{episode.duration}</p>
                                        </div>
                                        {/* Bouton pour lire cet épisode spécifique */}
                                        <button onClick={() => setShowPlayer(true)} className="text-red-600 hover:text-red-500 transition">
                                            <FaPlay />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DetailPage;