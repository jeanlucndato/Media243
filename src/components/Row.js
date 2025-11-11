// src/components/Row.js
import React from 'react';
import MediaCard from './MediaCard';

const Row = ({ title, mediaList }) => {
    // Le composant Row prend un titre (ex: "Populaire") et une liste de médias (mediaList)

    return (
        <div className="mb-8 px-6">
            <h2 className="text-xl font-bold mb-3 text-white hover:text-red-500 cursor-pointer transition duration-200">
                {title}
            </h2>

            {/* Conteneur de la ligne avec défilement horizontal */}
            <div className="flex space-x-3 overflow-x-scroll scrollbar-hide">
                {/* map() sur la liste de médias pour afficher les cartes */}
                {mediaList.map((media) => (
                    <MediaCard key={media.id} media={media} />
                ))}
            </div>

            {/* Astuce Tailwind pour cacher la barre de défilement native (nécessite un plugin) */}
            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

        </div>
    );
};

export default Row;