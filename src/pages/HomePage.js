// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Row from '../components/Row';
import Footer from '../components/Footer';

// Données de mock
const mockMedia = [
    { id: 1, title: "L'Héritage du 243", poster_url: 'https://via.placeholder.com/300x450/B82329/FFFFFF?text=Film+1', rating: '9.2', year: '2024' },
    { id: 2, title: "Kinshasa Nights", poster_url: 'https://via.placeholder.com/300x450/404040/FFFFFF?text=Film+2', rating: '8.5', year: '2023' },
    { id: 3, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/300x450/222222/FFFFFF?text=Film+3', rating: '8.8', year: '2022' },
    { id: 4, title: "RDC Stories", poster_url: 'https://via.placeholder.com/300x450/555555/FFFFFF?text=Film+4', rating: '7.9', year: '2021' },
    { id: 5, title: "Saga de Goma", poster_url: 'https://via.placeholder.com/300x450/888888/FFFFFF?text=Film+5', rating: '8.1', year: '2023' },
];

const HomePage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Header */}
            <Header />

            {/* Bannière principale */}
            <section
                className="relative h-[70vh] bg-cover bg-center flex items-end p-10"
                style={{ backgroundImage: "url('https://via.placeholder.com/1920x800/222222/FFFFFF?text=Bannière+Principale')" }}
            >
                <div className="bg-gradient-to-t from-black to-transparent w-full p-6 md:p-10 rounded-lg">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Media243 Originals</h1>
                    <p className="max-w-xl text-gray-300 mb-6">
                        Découvrez les films et séries africains les plus populaires sur Media243. Action, drame, documentaire et bien plus !
                    </p>
                    <div className="flex space-x-4">
                        <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition">Regarder</button>
                        <button className="bg-gray-700 text-white px-6 py-2 font-semibold rounded hover:bg-gray-600 transition">Ma liste</button>
                    </div>
                </div>
            </section>

            {/* Lignes de contenu */}
            <main className="relative -mt-20 space-y-8 px-6 md:px-12">
                <Row title="🔥 Tendance Media243 Actuellement" mediaList={mockMedia} />
                <Row title="🎬 Nouveautés Africaines" mediaList={mockMedia} />
                <Row title="📽️ Documentaires RDC" mediaList={mockMedia.slice(1)} />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
