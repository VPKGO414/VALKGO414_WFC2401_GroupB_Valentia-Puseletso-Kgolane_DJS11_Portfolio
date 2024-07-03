import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';
 // Import the CSS file for styling

interface SearchBarProps {
    onSearchTextChange: (text: string) => void;
    hidepopup: () => void;
    handleNav: (value: boolean) => void;
}

export default function SearchBar({
    onSearchTextChange,
    hidepopup,
    handleNav,
}: SearchBarProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        onSearchTextChange(text);
    }, [text, onSearchTextChange]);

    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setText(event.target.value);
    };

    const focusHandler = () => {
        hidepopup();
        handleNav(false);
    };

    const clearHandler = () => {
        setText('');
    };

    return (
        <div className="search-bar-container">
            <input
                onFocus={focusHandler}
                onChange={handleTextChange}
                value={text}
                type="text"
                className="search-input"
                placeholder="Search"
            />
            <button onClick={clearHandler} className="clear-button">
                x
            </button>
        </div>
    );
}
