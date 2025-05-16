import React, { useState } from 'react';
import './Footer.css'
function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);

  const handleClick = () => {
    setShowAuthors(!showAuthors);
  };

  return (
      <div className="Footer" onClick={handleClick} style={{ cursor: 'pointer' }}>
          <div className="FooterContent">
              {/* Left links */}
              <div className="FooterLinks">
                  <a href="#sobre" className="footer-link">Sobre</a>
                  <a href="#contactos" className="footer-link">Contactos</a>
                  <a href="#faq" className="footer-link">Perguntas Frequentes</a>
              </div>

              {/* Right/center text */}
              <p className="FooterText">
                  {showAuthors ? 'Autores: Alexandre, Catarina, Misael' : '© 2025 StudyPartner'}
              </p>
          </div>
      </div>
  );
}

export default Footer;
