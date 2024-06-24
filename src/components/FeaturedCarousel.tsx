import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPreviews } from '../services/api';
import CarouselControls from './CarouselControls';
import CarouselImages from './CarouselImages';
import { Preview } from '../types';
import '../styles/FeaturedCarousel.css';

const FeaturedCarousel: React.FC = () => {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPreviews = async () => {
      try {
        const data = await fetchPreviews();
        setPreviews(data);
      } catch (error) {
        console.error('Error loading previews:', error);
      }
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
    navigate(`/podcast/${id}`);
  };

  return (
    <div className="carousel">
      {previews.length > 0 && (
        <div className="carousel-slide">
          <CarouselControls onPrev={prevSlide} onNext={nextSlide} />
          <div className="carousel-content">
            <CarouselImages
              previews={previews}
              currentIndex={currentIndex}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;
