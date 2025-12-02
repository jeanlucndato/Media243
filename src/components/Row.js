import React from 'react';
import MediaCard from './MediaCard';

const Row = ({ title, mediaList }) => {
  if (!mediaList || mediaList.length === 0) {
    return null;
  }

  return (
    // Conteneur de la ligne : Ajout d'une marge supérieure plus prononcée pour séparer les lignes
    // et retrait de la marge intérieure latérale du Row lui-même.
    <div className="mb-12">

      {/* 1. TITRE DE LA CATÉGORIE - Plus de style et d'espace */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white 
                       pl-6 md:pl-12 lg:pl-20 
                       hover:text-red-500 transition duration-300 cursor-pointer">
        {title}
      </h2>

      {/* 2. CONTENEUR DE DÉFILEMENT - Scrollbar masquée et ombres de transition */}
      <div className="relative">

        {/* 💡 Masque Dégradé Gauche : Crée un effet de "bordure" invisible à gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

        {/* Contenu défilant */}
        <div
          className="flex space-x-4 overflow-x-scroll scrollbar-hide py-4 
                               pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 lg:pr-20"
        >
          {mediaList.map((media) => (
            // Le MediaCard gère déjà son propre style "attirant" (hover:scale-105)
            <MediaCard key={media.id} media={media} />
          ))}
        </div>

        {/* 💡 Masque Dégradé Droit : Crée un effet de "plus à voir" à droite */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default Row;
// NOTE : La classe 'scrollbar-hide' nécessite un peu de CSS personnalisé :
/*
// Dans votre fichier CSS global (e.g., App.css ou index.css)
.scrollbar-hide::-webkit-scrollbar {
    display: none; // Pour Chrome, Safari, Opera
}
.scrollbar-hide {
    -ms-overflow-style: none;  // Pour IE et Edge
    scrollbar-width: none;  // Pour Firefox
}
*/