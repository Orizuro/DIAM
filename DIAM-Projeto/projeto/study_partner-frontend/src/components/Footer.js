import React, { useState } from 'react';
import './styles/Footer.css'
import {Link} from "react-router-dom";
function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);

  const handleClick = () => {
    setShowAuthors(!showAuthors);
  };

  return (
      <div className="Footer" onClick={handleClick} style={{ cursor: 'pointer' }}>
          <div className="FooterContent">
              {/* Left links */}
              <ul className="FooterLinks">
                  <li><Link to="/about" className="nav-link">Sobre</Link></li>
                  <li><Link to="/contacts" className="nav-link">Contactos</Link></li>
                  <li><Link to="/qa" className="nav-link">Perguntas Frequentes</Link></li>
              </ul>

              {/* Right/center text */}
              <p className="FooterText">
                  {showAuthors ? 'Autores: Alexandre, Catarina, Misael' : '© 2025 StudyPartner'}
              </p>
          </div>
      </div>
  );
}

export default Footer;
