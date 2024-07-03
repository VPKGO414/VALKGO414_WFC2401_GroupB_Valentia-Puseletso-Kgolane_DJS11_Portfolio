import React, { useState } from 'react';
import '../styles/navBar.css';

interface NavBarProps {
  onNavigate: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState('HomePage');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    onNavigate(page);
  };

  return (
    <nav className="navbar">
      <ul>
        <li className={currentPage === 'HomePage' ? 'active' : ''} onClick={() => handleNavigation('HomePage')}>
          Home
        </li>
        <li className={currentPage === 'GenrePage' ? 'active' : ''} onClick={() => handleNavigation('GenrePage')}>
          Genres
        </li>
        <li className={currentPage === 'FavouriteEpisodes' ? 'active' : ''} onClick={() => handleNavigation('FavouriteEpisodes')}>
          Favourites
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
