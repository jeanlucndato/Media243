import React from 'react';
import { useNavigate } from 'react-router-dom';

const MediaCard = ({ media }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Redirige vers la page de détails en utilisant l'ID du média
        // Assurez-vous que media.id existe dans votre mockMedia !
        navigate(`/media/${media.id}`);
    };

    return (
        <>

            <div
                onClick={handleClick}
                className="w-40 md:w-52 flex-shrink-0 cursor-pointer transition duration-300 transform hover:scale-105 hover:z-10 relative group"
            >
                <img
                    src={media.poster_url}
                    alt={media.title}
                    className="rounded-lg object-cover w-full h-auto shadow-xl"
                />

                {/* Overlay d'information au survol (Design Stream moderne) */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 rounded-lg flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <p className="text-white font-bold text-sm truncate">{media.title}</p>
                </div>
            </div>
        </>

    );
};

export default MediaCard;