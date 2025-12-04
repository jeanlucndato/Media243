import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        "Audiodescription", "Centre d'aide", "Cartes cadeaux", "Presse",
        "Relations Investisseurs", "Recrutement", "Conditions d'utilisation", "Confidentialité",
        "Informations légales", "Préférences de cookies", "Mentions légales", "Nous contacter",
    ];

    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Social Icons */}
                <div className="footer__social">
                    <FaFacebookF className="footer__social-icon" />
                    <FaInstagram className="footer__social-icon" />
                    <FaTwitter className="footer__social-icon" />
                    <FaYoutube className="footer__social-icon" />
                </div>

                {/* Links Grid */}
                <ul className="footer__links">
                    {links.map((link, index) => (
                        <li key={index} className="footer__link">
                            {link}
                        </li>
                    ))}
                </ul>

                {/* Service Code Button */}
                <div className="footer__service-code">
                    <button className="footer__service-btn">
                        Code de service
                    </button>
                </div>

                {/* Copyright */}
                <p className="footer__copyright">
                    © 2021-{currentYear} Media243, Inc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;