import React, { useState } from 'react';
import { FacebookIcon, XIcon, LinkedInIcon, InstagramIcon } from './SocialIcons';

function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);

  const handleClick = () => {
    setShowAuthors(!showAuthors);
  };

  return (
    <div className="Footer" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p style={{ color: 'white', fontSize: '0.8em', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        {showAuthors ? 'Autores: Alexandre, Catarina, Misael' : '© 2025 StudyPartner'}
      </p>
    </div>
  );
}

export default Footer;
