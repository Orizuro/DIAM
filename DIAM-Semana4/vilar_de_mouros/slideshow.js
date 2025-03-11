import React, {useEffect, useState} from 'react';
import "./slideshow.css"

import festival2021 from '../Images/festival2021.webp';
import festival2022 from '../Images/festival2022.jpg';
import festival2023 from '../Images/festival2023.webp';
import festival2024 from '../Images/festival2024.webp';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: festival2024, alt: 'Festival 2024' },
    { src: festival2023, alt: 'Festival 2023' },
    { src: festival2022, alt: 'Festival 2022' },
    { src: festival2021, alt: 'Festival 2021' }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div>
        <h2>Fotos de edições anteriores</h2>
        <div className="slideshow-container">
          <div className="slideElem">
            <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
            />
          </div>
        </div>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
  );
};

export default Slideshow;

