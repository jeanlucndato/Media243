// src/pages/HomePage.jsx
import React from 'react';
// 💡 Importez le hook useNavigate pour la navigation
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Row from '../components/Row';
import Footer from '../components/Footer';
// importe les images
import img from '../assets/images/C2.jpg';
import img2 from '../assets/images/HYDRAQ.png';
import img3 from '../assets/images/LOCKBIT.jpg';
import img4 from '../assets/images/SNORT.jpg';
import img5 from '../assets/images/jean.png';

// main banner image
import mainbanner from '../assets/images/mainbanner.png';

// MOCK: Données
const mockMedia = [
    { id: 1, title: "L'Héritage du 243", poster_url: img, rating: '9.2', year: '2024' },
    { id: 2, title: "Kinshasa Nights", poster_url: img2, rating: '8.5', year: '2023' },
    { id: 3, title: "La Nuit du Congo", poster_url: img3, rating: '8.8', year: '2022' },
    { id: 4, title: "RDC Stories", poster_url: img4, rating: '7.9', year: '2021' },
    { id: 5, title: "Saga de Goma", poster_url: img5, rating: '8.1', year: '2023' },
];

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
                // Hauteur responsive: 80vh sur mobile, 90vh sur desktop
                className="relative h-[80vh] md:h-[90vh] w-full bg-cover bg-center flex items-end p-6 md:p-12"
                style={{ backgroundImage: heroMedia.backgroundImage }}
            >
                {/* Gradient pour l'effet d'ombre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                <div className="relative z-10 max-w-2xl">
                    {/* Taille du titre responsive */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">
                        {heroMedia.title}
                    </h1>
                    {/* Texte de description responsive */}
                    <p className="max-w-lg text-gray-200 text-sm md:text-xl mb-6 drop-shadow-md">
                        {heroMedia.description}
                    </p>
                    <div className="flex space-x-4">
                        {/* 💡 BOUTON "REGARDER" : Appelle la fonction de lecture */}
                        <button
                            onClick={handleWatchClick}
                            className="flex items-center bg-white text-black px-4 py-2 md:px-6 md:py-3 font-bold text-base md:text-lg rounded-lg hover:bg-gray-200 transition duration-300">
                            ▶️ Regarder
                        </button>
                        {/* 💡 BOUTON "PLUS D'INFOS" : Appelle la fonction de redirection */}
                        <button
                            onClick={handleMoreInfoClick}
                            className="hidden sm:flex items-center bg-gray-700/70 text-white px-4 py-2 md:px-6 md:py-3 font-semibold text-base md:text-lg rounded-lg hover:bg-gray-600/90 transition duration-300">
                            ⓘ Plus d'infos
                        </button>
                    </div>
                </div>
            </section>

            {/* Lignes de contenu : flex-grow pour l'espace restant */}
            <main className="relative -mt-32 space-y-12 pb-20 flex-grow">
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