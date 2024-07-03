import React from 'react';
import styled from 'styled-components';

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

const CarouselImages = () => {
    // Example data - replace with your actual data or logic
    const images = [
        { id: 1, src: '/path/to/image1.jpg', alt: 'Image 1' },
        { id: 2, src: '/path/to/image2.jpg', alt: 'Image 2' },
        { id: 3, src: '/path/to/image3.jpg', alt: 'Image 3' },
    ];

    return (
        <CarouselImagesContainer className="carousel-images">
            {images.map((image) => (
                <Image key={image.id} src={image.src} alt={image.alt} />
            ))}
        </CarouselImagesContainer>
    );
};

export default CarouselImages;
