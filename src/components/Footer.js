import React from "react";
// Assurez-vous d'avoir les imports pour les icônes si vous les utilisez (FaFacebook, etc.)

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        "Centre d'aide", "Cartes Cadeaux", "Relations Investisseurs", "Conditions d'utilisation",
        "Confidentialité", "Préférences de cookies", "Mentions légales", "Nous contacter",
        "Compte", "Vitesse du test",
    ];

    return (
        // Remplacement de px-4 par px-3 sur mobile pour minimiser l'espace perdu
        <footer className="bg-black text-gray-400 py-8 px-3 sm:px-10 md:px-20 border-t border-gray-800 mt-12">
            <div className="max-w-6xl mx-auto">

                {/* Section Réseaux Sociaux */}
                {/* Justification centrée par défaut, seulement 'md:justify-start' pour desktop */}
                <div className="flex space-x-6 mb-6 justify-center md:justify-start text-base">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
                        FB
                    </a>
                    {/* ... (Inclure ici les autres liens sociaux comme IG, TW, YT) ... */}
                </div>

                {/* Grille des Liens */}
                {/* text-xs par défaut (très petit) et gap-x-2 (espace horizontal minimal) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 
                            gap-y-3 gap-x-2 // Gap minimal pour les mobiles
                            text-[10px] sm:text-xs md:text-sm // Taille de texte très petite
                            mb-6 text-center md:text-left"
                >
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
                    <button className="border border-gray-600 px-3 py-1 text-xs hover:border-white rounded transition duration-200">
                        Français
                    </button>
                </div>

                {/* Copyright */}
                {/* Texte le plus petit pour le copyright */}
                <p className="text-[10px] text-center md:text-left mt-4">
                    © {currentYear} Media243. Tous droits réservés. | Conçu pour la diaspora.
                </p>
            </div>
        </footer>
    );
};

export default Footer;