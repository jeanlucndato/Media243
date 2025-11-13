import React, { useState, useEffect, useCallback } from 'react';
import VideoPlayer from '../components/VideoPlayer'; // Assurez-vous que le chemin est correct

// Fonction simulant l'enregistrement de la progression de l'utilisateur dans une base de données
const saveProgressToAPI = (videoId, currentTime) => {
    // Ici, vous feriez une requête AXIOS ou FETCH vers votre backend
    console.log(`[API MOCK] Enregistrement pour la Vidéo ${videoId} à ${Math.round(currentTime)} secondes...`);
    // Exemple: fetch('/api/save-progress', { method: 'POST', body: { videoId, currentTime } });
};

// --- Composant Principal de la Page de Visionnage ---
const WatchPage = () => {
    // Simuler la récupération des données de la vidéo (remplacer par un fetch réel)
    const [videoData, setVideoData] = useState({
        id: 'media243-ep101',
        title: 'Le Destin de Goma - Épisode 1',
        url: 'https://votre-cdn.com/videos/goma-ep1.m3u8', // Lien HLS ou DASH de votre CDN
        startingTime: 120, // Simule la reprise à 120 secondes (2 minutes)
    });

    // ----------------------------------------------------
    // LOGIQUE CRITIQUE : Configuration et Interaction du Lecteur
    // ----------------------------------------------------

    // 1. Configuration des options pour Video.js
    const videoJsOptions = {
        autoplay: true, // Lecture automatique (peut dépendre du navigateur)
        controls: true, // Afficher les contrôles
        responsive: true,
        fluid: true,
        preload: 'auto',
        sources: [{
            src: videoData.url,
            type: 'application/x-mpegURL' // Type MIME pour le HLS (ou 'application/dash+xml' pour DASH)
        }],
        // Paramètre pour commencer la lecture à un moment précis (pour la reprise)
        start: videoData.startingTime
    };

    // 2. Fonction de gestion des événements du lecteur
    const handlePlayerReady = useCallback((player) => {
        // Le joueur VJS est prêt et peut être contrôlé

        // A. Avancer la lecture au point de reprise
        if (videoData.startingTime > 0) {
            player.currentTime(videoData.startingTime);
            console.log(`Reprise de la lecture à ${videoData.startingTime} secondes.`);
        }

        // B. Enregistrer la progression à chaque PAUSE
        player.on('pause', () => {
            // timeupdate est trop fréquent, 'pause' est mieux pour l'enregistrement
            const currentTime = player.currentTime();
            saveProgressToAPI(videoData.id, currentTime);
        });

        // C. Enregistrer la progression lors de la fermeture ou du changement de page
        // (Cette logique est souvent complexe et gérée par un 'cleanup' ou un autre 'on' event)
        // Ici, on enregistre une dernière fois quand la vidéo est terminée
        player.on('ended', () => {
            saveProgressToAPI(videoData.id, 0); // Réinitialiser ou marquer comme terminé
        });

    }, [videoData.id, videoData.startingTime]); // Dépendances pour le useCallback

    // ----------------------------------------------------
    // Rendu du Composant
    // ----------------------------------------------------

    if (!videoData.url) {
        return <div>Chargement de la vidéo...</div>;
    }

    return (
        <div className="watch-page-container">
            <header className="video-header">
                <h1>{videoData.title}</h1>
                <p>Enregistré à l'instant : {Math.round(videoData.startingTime)}s</p>
            </header>

            <div className="video-player-wrapper">
                <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
            </div>

            <section className="metadata-section">
                {/* Ici, vous ajouteriez la description, les acteurs, la section "Épisodes suivants", etc. */}
                <h2>Description</h2>
                <p>Suivez l'histoire épique d'un jeune entrepreneur congolais qui découvre le secret de la réussite dans la ville de Goma.</p>
            </section>

        </div>
    );
};

export default WatchPage;