import React from 'react';

interface CarouselControlsProps {
    onNext: () => void;
    onPrev: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ onNext, onPrev }) => {
    return (
        <div className="carousel-controls">
            <button onClick={onPrev} className="control-button">
                &lt; Prev
            </button>
            <button onClick={onNext} className="control-button">
                Next &gt;
            </button>
        </div>
    );
};

export default CarouselControls;

// Inner styling with pink and purple colors
const styles = `
    .carousel-controls {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 20px;
        z-index: 10;
    }

    .control-button {
        background-color: #d9a7c7; /* pink */
        color: #9b59b6; /* purple */
        border: none;
        outline: none;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
    }

    .control-button:hover {
        background-color: #9b59b6; /* purple */
        color: #d9a7c7; /* pink */
    }
`;

// Inject inner styles into the document head
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
