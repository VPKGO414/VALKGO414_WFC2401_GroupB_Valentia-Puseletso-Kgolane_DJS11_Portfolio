import React from 'react';
import { Preview } from '../types';

interface CarouselImagesProps {
  previews: Preview[];
  currentIndex: number;
  onImageClick: (id: string) => void;
}

const CarouselImages: React.FC<CarouselImagesProps> = ({ previews, currentIndex, onImageClick }) => (
  <div className="carousel-images">
    {previews.slice(currentIndex, currentIndex + 3).map((preview, index) => (
      <img
        key={index}
        src={preview.image}
        alt={preview.title}
        className="carousel-image"
        onClick={() => onImageClick(preview.id)}
      />
    ))}
  </div>
);

export default CarouselImages;
