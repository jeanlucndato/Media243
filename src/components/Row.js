// src/components/Row.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Row = ({ title, mediaList }) => {
  return (
    <div className="pt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 ml-4 md:ml-12">{title}</h2>

      {/* Conteneur du défilement horizontal */}
      <div className="flex space-x-2 sm:space-x-4 overflow-x-scroll scrollbar-hide p-4 pl-4 md:pl-12">

        {mediaList.map((media) => (
          <Link to={`/media/${media.id}`} key={media.id}>
            <div
              className="relative 
                                min-w-[120px] h-[180px] // Mobile (Taille de base)
                                sm:min-w-[150px] sm:h-[225px] // Tablette
                                md:min-w-[180px] md:h-[270px] // Desktop
                                lg:min-w-[250px] lg:h-[375px] // Grand Desktop
                                cursor-pointer transition duration-200 transform hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden"
            >

              {/* Affiche du média */}
              <img
                src={media.poster_url}
                alt={media.title}
                className="w-full h-full object-cover"
              />

              {/* Info Hover (taille de texte responsive) */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition flex flex-col justify-end p-2">
                <p className="text-xs sm:text-sm font-bold opacity-0 hover:opacity-100">{media.title}</p>
                <p className="text-2xs sm:text-xs text-yellow-400 opacity-0 hover:opacity-100">⭐️ {media.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Row;