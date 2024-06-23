import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Podcally</h1>
        <p>Podcast that sounds musically</p>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/genres">Genres</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
