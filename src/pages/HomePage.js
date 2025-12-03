// src/pages/HomePage.jsx
import React from 'react';
// 💡 Importez le hook useNavigate pour la navigation
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Row from '../components/Row';
import Footer from '../components/Footer';
// importe les images
import mainbanner from '../assets/images/mainbanner.png';

import { mockMedia } from '../data/mockData';

// --- Définition d'un Média spécifique pour la bannière (POUR LA NAVIGATION) ---
// Vous devriez obtenir l'ID du média principal via une API, mais pour l'instant, on utilise l'ID 1
const HERO_MEDIA_ID = 1;

const HomePage = () => {
    // 💡 INITIALISATION du hook de navigation
    const navigate = useNavigate();

    // Utiliser les données du contexte si elles sont disponibles
    const heroMedia = {
        id: HERO_MEDIA_ID, // Ajouter l'ID pour la redirection
        title: "Le Cœur de l'Afrique",
        description: "Plongez dans un drame historique captivant sur les rives du lac Kivu. Un Media243 Original à ne pas manquer.",
        backgroundImage: `url(${mainbanner})`,
    };

    // Pour l'exemple sans MediaContext
    const categories = [
        { title: "🔥 Tendance Media243 Actuellement", mediaList: mockMedia },
        { title: "🎬 Nouveautés Africaines", mediaList: mockMedia.slice(2) },
    ];

    // 💡 Fonction de navigation vers la page de détails
    const handleMoreInfoClick = () => {
        // Redirige vers la route protégée : /media/:id
        navigate(`/media/${heroMedia.id}`);
    };

    // 💡 Fonction pour simuler la lecture (redirige vers une page de lecture si elle existe)
    const handleWatchClick = () => {
        // Pour l'instant, on redirige vers les détails, ou vers une future page de lecture /watch/:id
        console.log("Démarrer la lecture du média : ", heroMedia.id);
        // navigate(`/watch/${heroMedia.id}`); 
        navigate(`/media/${heroMedia.id}`); // On redirige vers les détails pour cet exemple
    };


    return (
        // Conteneur principal flexible pour pousser le Footer vers le bas
        <div className="bg-black text-white min-h-screen flex flex-col">
            <Header />

            {/* Bannière principale */}
            <section
                className="relative h-[65vh] md:h-[85vh] lg:h-[95vh] w-full bg-cover bg-center flex items-center md:items-end pb-12 md:pb-24 pl-4 md:pl-12"
                style={{
                    backgroundImage: heroMedia.backgroundImage,
                    backgroundPosition: "center top"
                }}
            >
                {/* Gradient Overlay - Top to Bottom & Left to Right */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-netflix-black"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

                <div className="relative z-10 max-w-2xl pt-20 md:pt-0 animate-fade-in">
                    {/* Titre */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 drop-shadow-xl text-white tracking-tight">
                        {heroMedia.title}
                    </h1>

                    {/* Meta Info (Optional - can be added later) */}
                    <div className="flex items-center space-x-4 mb-4 text-gray-300 text-sm md:text-base font-medium">
                        <span className="text-green-400 font-bold">98% Match</span>
                        <span>2024</span>
                        <span className="border border-gray-500 px-1 text-xs">16+</span>
                        <span>2h 15m</span>
                    </div>

                    {/* Description */}
                    <p className="max-w-lg text-white text-base md:text-lg lg:text-xl mb-8 drop-shadow-md font-normal leading-relaxed text-shadow-md">
                        {heroMedia.description}
                    </p>

                    {/* Boutons */}
                    <div className="flex space-x-4">
                        <button
                            onClick={handleWatchClick}
                            className="flex items-center bg-white text-black px-6 py-2 md:px-8 md:py-3 font-bold text-lg rounded hover:bg-white/80 transition duration-300 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Lecture
                        </button>
                        <button
                            onClick={handleMoreInfoClick}
                            className="flex items-center bg-gray-500/70 text-white px-6 py-2 md:px-8 md:py-3 font-bold text-lg rounded hover:bg-gray-500/50 transition duration-300 gap-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Plus d'infos
                        </button>
                    </div>
                </div>
            </section>

            {/* Lignes de contenu : flex-grow pour l'espace restant */}
            <main className="relative -mt-32 space-y-12 pb-20 flex-grow z-20">
                {
                    categories.map((category, index) => (
                        <Row
                            key={index}
                            title={category.title}
                            // 💡 Prochaine étape : Passer le navigate à Row ou implémenter la navigation dans Row
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