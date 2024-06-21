import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { fetchPreviews } from './api';
import './FeaturedCarousel.css';

const FeaturedCarousel: React.FC = () => {
  const [previews, setPreviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Updated hook

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

  const handleImageClick = (id: string) => {
    navigate(`/podcast/${id}`); // Updated navigation
  };

  return (
    <div className="carousel">
      {previews.length > 0 && (
        <div className="carousel-slide">
          <button className="carousel-button prev" onClick={prevSlide}>❮</button>
          <div className="carousel-content">
            <div className="carousel-images">
              {previews.slice(currentIndex, currentIndex + 3).map((preview, index) => (
                <img
                  key={index}
                  src={preview.image}
                  alt={preview.title}
                  className="carousel-image"
                  onClick={() => handleImageClick(preview.id)}
                />
              ))}
            </div>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>❯</button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;
