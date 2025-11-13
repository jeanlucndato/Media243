import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Créer le Context
const MediaContext = createContext();

// URL de base de votre API Backend
const API_URL = 'https://votre-backend.com/api/media';

// --- MOCK : Données Similaires à l'API ---
const mockMediaData = {
    // Les listes de carrousels pour la page d'accueil
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
    // Le média en bannière
    heroMedia: {
        id: 1,
        title: "Le Cœur de l'Afrique",
        description: "Plongez dans un drame historique captivant sur les rives du lac Kivu.",
        backgroundImage: "url('https://via.placeholder.com/1920x800/1C1C1C/FFFFFF?text=Bannière+Principale')",
    },
};
// --- FIN MOCK ---


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
            // REMPLACER par votre appel API réel :
            // const response = await axios.get(`${API_URL}/homepage`); 
            // setCategories(response.data.categories);
            // setHeroMedia(response.data.heroMedia);

            // UTILISATION DU MOCK pour le développement
            await new Promise(resolve => setTimeout(resolve, 800));
            setCategories(mockMediaData.categories);
            setHeroMedia(mockMediaData.heroMedia);

        } catch (err) {
            setError('Impossible de charger les données. Veuillez réessayer.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les détails d'un seul média
    const getMediaDetails = async (mediaId) => {
        // Dans une vraie application, vous mettez en cache les détails ici.
        try {
            // REMPLACER par votre appel API réel :
            // const response = await axios.get(`${API_URL}/details/${mediaId}`); 
            // return response.data;

            // UTILISATION D'UN MOCK pour le développement
            await new Promise(resolve => setTimeout(resolve, 300));

            // Simuler la récupération de données détaillées
            return {
                id: mediaId,
                title: `Détail du Média ID ${mediaId}`,
                description: "Ceci est une description détaillée...",
                videoUrl: 'https://votre-cdn.com/videos/test-ep1.m3u8',
                posterUrl: 'https://via.placeholder.com/1280x720/1A1A1A/FFFFFF?text=Détail+Banner',
                // Ajoutez toutes les métadonnées ici
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
        refetchMedia: fetchAllMediaData, // Pour recharger les données si nécessaire
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