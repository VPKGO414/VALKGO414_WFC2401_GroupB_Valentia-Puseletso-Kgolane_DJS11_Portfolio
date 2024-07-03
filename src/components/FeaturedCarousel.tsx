import React, { useState, useEffect } from 'react';
import { Preview } from '../interfaces'; // Adjust path as per your project structure
import { getAllPreviews } from '../utils/api'; // Adjust path as per your project structure
import CarouselImages from './CarouselImages'; // Ensure CarouselImages component is correctly imported
import CarouselControls from './CarouselControls'; // Ensure CarouselControls component is correctly imported
import '../styles/FeaturedCarousel.css';

const FeaturedCarousel: React.FC = () => {
    const [previews, setPreviews] = useState<Preview[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPreviews = async () => {
            try {
                const previewData = await getAllPreviews();
                setPreviews(previewData);
            } catch (err: any) {
                setError(`Error loading previews: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        loadPreviews();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % previews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + previews.length) % previews.length);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Ensure we have enough previews to show 4 images
    const selectedPreviews = previews.slice(currentIndex, currentIndex + 4);

    return (
        <div className="featured-carousel">
            <CarouselImages previews={selectedPreviews} /> {/* Pass 4 selected previews */}
            <CarouselControls onNext={handleNext} onPrev={handlePrev} />
        </div>
    );
};

export default FeaturedCarousel;
