import React from 'react';
import styled from 'styled-components';
import { Preview } from '../interfaces'; // Adjust path as per your project structure

interface CarouselImagesProps {
    previews: Preview[];
}

// Styled component for the carousel images container
const CarouselImagesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
`;

// Styled component for individual carousel images
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`;

const CarouselImages: React.FC<CarouselImagesProps> = ({ previews }) => {
    return (
        <CarouselImagesContainer className="carousel-images">
            {previews.map((preview) => (
                <Image key={preview.id} src={preview.image} alt={preview.title} />
            ))}
        </CarouselImagesContainer>
    );
};

export default CarouselImages;
