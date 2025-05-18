import React, { useState } from 'react';
import { FacebookIcon, XIcon, LinkedInIcon, InstagramIcon } from './SocialIcons';

function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);

  const handleClick = () => {
    setShowAuthors(!showAuthors);
  };

    return (
        <footer className="footer-container">
            <div className="footer-social">
                <a href="https://facebook.com" aria-label="Facebook">
                    <FacebookIcon size={20} color="#ffffff" />
                </a>
                <a href="https://x.com" aria-label="X">
                    <XIcon size={20} color="#ffffff" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn">
                    <LinkedInIcon size={20} color="#ffffff" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                    <InstagramIcon size={20} color="#ffffff" />
                </a>
            </div>

            <div className="footer-links">
                <a href="/QA">Perguntas Frequentes</a>
                <a href="/about">Sobre</a>
                <a href="/contacts">Contactos</a>
            </div>




    <div className="footer-copyright" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <p>
                    {showAuthors ? 'Autores: Alexandre, Catarina, Misael' : '© 2025 StudyPartner'}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
