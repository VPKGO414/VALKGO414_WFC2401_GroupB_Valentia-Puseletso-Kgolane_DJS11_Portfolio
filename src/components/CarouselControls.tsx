import React from 'react';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ onPrev, onNext }) => (
  <div className="carousel-controls">
    <button className="carousel-button prev" onClick={onPrev}>❮</button>
    <button className="carousel-button next" onClick={onNext}>❯</button>
  </div>
);

export default CarouselControls;
