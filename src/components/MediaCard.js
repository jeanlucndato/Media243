// src/components/MediaCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const MediaCard = ({ media }) => {
    // Utilisez la prop 'media' pour accéder aux données (ID, titre, URL de l'affiche)
    // media.poster_url est l'image du film/série

    return (
        // Utilisation de la composante Link pour rendre la vignette cliquable
        <Link to={`/media/${media.id}`}>
            <div className="group relative w-44 h-72 cursor-pointer transition duration-300 ease-in-out transform hover:scale-125 hover:z-50 shadow-lg hover:shadow-2xl">

                {/* L'image principale (affiche) */}
                <img
                    className="w-full h-full object-cover rounded-md group-hover:rounded-none transition duration-300"
                    src={media.poster_url}
                    alt={media.title}
                    loading="lazy" // Optimisation pour le chargement des images
                />

                {/* Overlay d'information au survol (similaire à Netflix) */}
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 rounded-md group-hover:rounded-none">
                    <h3 className="text-sm font-bold truncate mb-1 text-red-500">
                        {media.title}
                    </h3>
                    <p className="text-xs text-gray-300">
                        {media.rating} | {media.year}
                    </p>
                    {/* Vous pouvez ajouter d'autres infos ici, comme les boutons 'Play' */}
                </div>
            </div>
        </Link>
    );
};

export default MediaCard;