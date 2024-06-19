import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Podcally</h1>
        <p>Podcast that sound musically</p>
      </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#genres">Genres</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
