import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Créer le Context
const MediaContext = createContext();

// URL de base de votre API Backend
// Note: Les endpoints sont /movies et /categories, donc on pointe vers /api
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3000/api');

// --- MOCK : Données Similaires à l'API (Fallback) ---
const mockMediaData = {
    categories: [
        {
            title: "🔥 Tendance Media243", endpoint: '/trending', mediaList: [
                { id: 1, title: "L'Héritage du 243", poster_url: 'https://via.placeholder.com/300x450/B82329/FFFFFF?text=Film+1', rating: '9.2' },
                { id: 2, title: "Kinshasa Nights", poster_url: 'https://via.placeholder.com/300x450/404040/FFFFFF?text=Film+2', rating: '8.5' },
            ]
        },
        {
            title: "🎬 Nouveautés Africaines", endpoint: '/african-new', mediaList: [
                { id: 3, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/300x450/222222/FFFFFF?text=Film+3', rating: '8.8' },
                { id: 4, title: "RDC Stories", poster_url: 'https://via.placeholder.com/300x450/555555/FFFFFF?text=Film+4', rating: '7.9' },
            ]
        },
    ],
    heroMedia: {
        id: 1,
        title: "Le Cœur de l'Afrique",
        description: "Plongez dans un drame historique captivant sur les rives du lac Kivu.",
        backgroundImage: "url('https://via.placeholder.com/1920x800/1C1C1C/FFFFFF?text=Bannière+Principale')",
    },
};

// 2. Créer le Provider
export const MediaProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [heroMedia, setHeroMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour charger toutes les données de la page d'accueil
    const fetchAllMediaData = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Récupérer les films et les catégories en parallèle
            const [moviesRes, categoriesRes] = await Promise.all([
                axios.get(`${API_URL}/movies`),
                axios.get(`${API_URL}/categories`)
            ]);

            const movies = moviesRes.data.data || [];
            const categoriesList = categoriesRes.data.data || [];

            // 2. Organiser les films par catégorie (Genre)
            const organizedCategories = categoriesList.map(cat => {
                const catMovies = movies.filter(m => m.genre === cat.name || m.genre === cat.slug);
                // Si aucun film ne correspond exactement, on peut chercher par inclusion ou autre logique

                return {
                    title: cat.name,
                    endpoint: `/category/${cat.slug}`,
                    mediaList: catMovies.map(m => ({
                        id: m.id,
                        title: m.title,
                        poster_url: m.posterUrl || 'https://via.placeholder.com/300x450/222222/FFFFFF?text=' + encodeURIComponent(m.title), // Fallback
                        rating: m.rating || 'N/A',
                        description: m.description || '',
                        videoUrl: m.videoUrl || '',
                        ...m
                    }))
                };
            }).filter(cat => cat.mediaList.length > 0);

            // Ajouter une catégorie "Tout le catalogue" si on a des films mais qu'ils ne rentrent pas tous dans les catégories
            // Ou simplement pour avoir une liste complète
            if (movies.length > 0) {
                organizedCategories.unshift({
                    title: "🔥 Tout le catalogue",
                    endpoint: '/all',
                    mediaList: movies.map(m => ({
                        id: m.id,
                        title: m.title,
                        poster_url: m.posterUrl || 'https://via.placeholder.com/300x450/B82329/FFFFFF?text=' + encodeURIComponent(m.title),
                        rating: m.rating || 'N/A',
                        description: m.description || '',
                        videoUrl: m.videoUrl || '',
                        ...m
                    }))
                });
            }

            setCategories(organizedCategories);

            // 3. Définir le Hero Media
            if (movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setHeroMedia({
                    id: randomMovie.id,
                    title: randomMovie.title,
                    description: randomMovie.description || `Découvrez ${randomMovie.title}, disponible maintenant.`,
                    backgroundImage: randomMovie.backdropUrl ? `url('${randomMovie.backdropUrl}')` : "url('https://via.placeholder.com/1920x800/1C1C1C/FFFFFF?text=Media243')",
                });
            } else {
                setHeroMedia(mockMediaData.heroMedia);
            }

        } catch (err) {
            console.error("Erreur lors du chargement des données:", err);
            // Fallback sur les données mock en cas d'erreur
            setCategories(mockMediaData.categories);
            setHeroMedia(mockMediaData.heroMedia);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les détails d'un seul média
    const getMediaDetails = async (mediaId) => {
        try {
            // D'abord chercher dans les données déjà chargées
            for (const cat of categories) {
                const found = cat.mediaList.find(m => m.id === mediaId || m.id === parseInt(mediaId));
                if (found) return found;
            }

            // Si pas trouvé, essayer de fetcher (si l'endpoint existe)
            // const response = await axios.get(`${API_URL}/movies/${mediaId}`);
            // return response.data;

            // Sinon fallback mock
            await new Promise(resolve => setTimeout(resolve, 300));
            return {
                id: mediaId,
                title: `Détail du Média ID ${mediaId}`,
                description: "Description non disponible.",
                videoUrl: 'https://votre-cdn.com/videos/test-ep1.m3u8',
                posterUrl: 'https://via.placeholder.com/1280x720/1A1A1A/FFFFFF?text=Détail+Banner',
            };

        } catch (err) {
            throw new Error("Erreur lors de la récupération des détails.");
        }
    };

    useEffect(() => {
        fetchAllMediaData();
    }, []);

    const value = {
        categories,
        heroMedia,
        loading,
        error,
        getMediaDetails,
        refetchMedia: fetchAllMediaData,
    };

    return (
        <MediaContext.Provider value={value}>
            {children}
        </MediaContext.Provider>
    );
};

// 3. Hook personnalisé
export const useMedia = () => {
    return useContext(MediaContext);
};