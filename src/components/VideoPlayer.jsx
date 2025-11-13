import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
// Assurez-vous d'importer les styles CSS pour que le lecteur s'affiche correctement
import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady } = props;

    useEffect(() => {
        // 1. Initialiser le lecteur VJS (UNE SEULE FOIS)
        if (!playerRef.current) {
            const videoElement = videoRef.current;

            if (videoElement) {
                const player = playerRef.current = videojs(videoElement, options, () => {
                    console.log('Le lecteur est prêt !');
                    if (onReady) {
                        onReady(player);
                    }
                });
            }
        } else {
            // 2. Mettre à jour les propriétés (si nécessaire, ex: changer la source)
            // Ceci est pour gérer les changements d'une vidéo à l'autre sans recharger la page
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, onReady]); // Dépendances à surveiller

    // 3. Détruire le lecteur lors du démontage du composant (ESSENTIEL !)
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    // Le HTML simple sur lequel video.js va s'attacher
    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
};

export default VideoPlayer;