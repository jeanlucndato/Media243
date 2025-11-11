// src/components/Footer.js
import React from "react";
// Pour les icônes sociales, on peut utiliser react-icons plus tard.

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        "Centre d'aide",
        "Cartes Cadeaux",
        "Relations Investisseurs",
        "Conditions d'utilisation",
        "Confidentialité",
        "Préférences de cookies",
        "Mentions légales",
        "Nous contacter",
        "Compte",
        "Vitesse du test",
    ];

    return (
        <footer className="bg-black text-gray-400 py-10 px-6 md:px-20 border-t border-gray-800">
            <div className="max-w-6xl mx-auto">

                {/* Section Réseaux Sociaux */}
                <div className="flex space-x-6 mb-8 justify-center md:justify-start">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
                        FB
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
                        IG
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
                        TW
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
                        YT
                    </a>
                </div>

                {/* Grille des Liens */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm mb-8 text-center md:text-left">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href="#"
                            className="hover:underline hover:text-white transition duration-200"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Bouton de Langue */}
                <div className="flex justify-center md:justify-start mb-4">
                    <button className="border border-gray-600 px-4 py-2 text-sm hover:border-white rounded transition duration-200">
                        Français
                    </button>
                </div>

                {/* Copyright */}
                <p className="text-xs text-center md:text-left">
                    © {currentYear} Media243. Tous droits réservés. | Conçu pour la diaspora.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
