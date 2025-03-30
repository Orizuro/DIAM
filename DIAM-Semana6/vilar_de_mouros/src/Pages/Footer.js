import React, { useState } from 'react';

function Footer() {
  const [showAuthors, setShowAuthors] = useState(false);

  const handleClick = () => {
    setShowAuthors(!showAuthors);
  };

  return (
    <div className="Footer" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p style={{ color: 'white', fontSize: '0.8em', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        {showAuthors ? 'Autores: Alexandre, Catarina, Misael' : '© 2025 Festival Vilar de Mouros'}
      </p>
    </div>
  );
}

export default Footer;
