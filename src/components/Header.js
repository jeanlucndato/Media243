// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    // Note : Vous pourriez ajouter ici une gestion du scroll pour changer la couleur de fond
    // comme Netflix le fait (transparent au départ, puis noir en scrollant)

    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-black bg-opacity-70 backdrop-blur-sm p-4 transition duration-300">
            <div className="flex justify-between items-center max-w-7xl mx-auto">

                {/* Logo Media243 */}
                <div className="flex items-center space-x-8">
                    <Link to="/">
                        <h1 className="text-4xl font-black text-red-600 tracking-wider cursor-pointer">
                            Media<span className="text-white">243</span>
                        </h1>
                    </Link>

                    {/* Navigation principale (cachée en mobile) */}
                    <nav className="hidden md:flex space-x-6 text-sm font-semibold">
                        <Link to="/" className="text-white hover:text-gray-300 transition duration-150">Accueil</Link>
                        <Link to="/series" className="text-gray-400 hover:text-gray-200 transition duration-150">Séries</Link>
                        <Link to="/films" className="text-gray-400 hover:text-gray-200 transition duration-150">Films</Link>
                        <Link to="/mylist" className="text-gray-400 hover:text-gray-200 transition duration-150">Ma Liste</Link>
                    </nav>
                </div>

                {/* Actions secondaires (Recherche et Profil) */}
                <div className="flex items-center space-x-4">
                    {/* Icône de recherche (vous aurez besoin d'une librairie d'icônes, ex: react-icons) */}
                    <button className="text-white hover:text-red-500">
                        {/* Remplacer par une icône de recherche réelle */}

                    </button>

                    {/* Icône de Profil/Avatar */}
                    <Link to="/profile" className="w-8 h-8 rounded-md bg-gray-600 hover:ring-2 hover:ring-red-500 transition duration-150 flex items-center justify-center text-xs font-bold">
                        P
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;