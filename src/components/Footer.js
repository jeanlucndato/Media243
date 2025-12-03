import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        "Audiodescription", "Centre d'aide", "Cartes cadeaux", "Presse",
        "Relations Investisseurs", "Recrutement", "Conditions d'utilisation", "Confidentialité",
        "Informations légales", "Préférences de cookies", "Mentions légales", "Nous contacter",
    ];

    return (
        <footer className="w-full bg-netflix-black text-[#757575] py-16 px-4 md:px-16 lg:px-32 border-t border-gray-800/50 mt-auto font-light">
            <div className="max-w-5xl mx-auto">
                {/* Social Icons */}
                <div className="flex space-x-6 mb-8 text-white">
                    <FaFacebookF className="h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-300" />
                    <FaInstagram className="h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-300" />
                    <FaTwitter className="h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-300" />
                    <FaYoutube className="h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-300" />
                </div>

                {/* Links Grid */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4 text-sm mb-8">
                    {links.map((link, index) => (
                        <li key={index} className="hover:underline cursor-pointer transition duration-200">
                            {link}
                        </li>
                    ))}
                </ul>

                {/* Service Code Button */}
                <div className="mb-6">
                    <button className="border border-[#757575] px-4 py-1 text-sm hover:text-white hover:border-white transition duration-300">
                        Code de service
                    </button>
                </div>

                {/* Copyright */}
                <p className="text-xs">
                    © 1997-{currentYear} Media243, Inc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;