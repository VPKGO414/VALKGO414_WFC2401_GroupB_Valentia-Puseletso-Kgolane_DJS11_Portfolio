// Carousel.tsx
import React, { useState, useEffect } from 'react';
import { fetchPreviews } from './services/api';

const Carousel: React.FC = () => {
  const [previews, setPreviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadPreviews = async () => {
      const data = await fetchPreviews();
      setPreviews(data);
    };
    loadPreviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % previews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + previews.length) % previews.length);
  };

  return (
    <div className="carousel">
      {previews.length > 0 && (
        <div className="carousel-slide">
          <button className="carousel-button prev" onClick={prevSlide}>❮</button>
          <div className="carousel-content">
            <h3>{previews[currentIndex].title}</h3>
            <p>{previews[currentIndex].description}</p>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>❯</button>
        </div>
      )}
    </div>
  );
};

export default Carousel;

