// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; // Pour une navigation cohérente

const DetailPage = () => {
    const { id } = useParams(); // Récupère l'ID du média depuis l'URL (ex: /media/123)
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:5000/api'; // <--- L'URL DE VOTRE BACKEND EXPRESS !

    useEffect(() => {
        const fetchMediaDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/media/${id}`);
                setMedia(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des détails:', err);
                setError('Impossible de charger les détails du média.');
            } finally {
                setLoading(false);
            }
        };

        fetchMediaDetails();
    }, [id]); // Déclenche la récupération à chaque changement d'ID

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Chargement des détails...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
                {error}
            </div>
        );
    }

    if (!media) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
                Média introuvable.
            </div>
        );
    }

    // Si le média est chargé, affichez les détails
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            {/* Section Héro (grande image de fond, titre, description, bouton Play) */}
            <div
                className="relative h-screen bg-cover bg-center flex items-center px-10 md:px-20"
                style={{ backgroundImage: `linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0) 50%, rgba(20,20,20,1) 100%), url(${media.backdrop_url || media.poster_url})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Assombrir l'image */}
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">{media.title}</h1>
                    <p className="text-lg md:text-xl mb-6 line-clamp-3">{media.description}</p>

                    <div className="flex space-x-4">
                        <button className="flex items-center bg-white text-black text-lg font-bold py-3 px-8 rounded-md hover:bg-gray-300 transition duration-200">
                            {/* Icône de lecture (ex: depuis Font Awesome ou Heroicons) */}
                            ▶️ Lire
                        </button>
                        <button className="flex items-center bg-gray-600 text-white text-lg font-bold py-3 px-8 rounded-md hover:bg-gray-700 transition duration-200">
                            {/* Icône "Ma Liste" (ex: plus) */}
                            ➕ Ma Liste
                        </button>
                    </div>
                </div>
            </div>

            {/* Section Détails supplémentaires (casting, genres, etc.) */}
            <div className="px-10 md:px-20 py-10">
                <h2 className="text-3xl font-bold mb-6">Plus de détails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
                    <div>
                        <p><strong className="text-gray-400">Genre:</strong> {media.genres?.join(', ') || 'N/A'}</p>
                        <p><strong className="text-gray-400">Année:</strong> {media.release_year || 'N/A'}</p>
                        <p><strong className="text-gray-400">Durée:</strong> {media.duration || 'N/A'}</p>
                    </div>
                    <div>
                        <p><strong className="text-gray-400">Réalisateur:</strong> {media.director || 'N/A'}</p>
                        <p><strong className="text-gray-400">Acteurs:</strong> {media.cast?.join(', ') || 'N/A'}</p>
                    </div>
                </div>
                {/* Ajouter d'autres sections comme "Similaires" ici */}
            </div>
        </div>
    );
};

export default DetailPage;