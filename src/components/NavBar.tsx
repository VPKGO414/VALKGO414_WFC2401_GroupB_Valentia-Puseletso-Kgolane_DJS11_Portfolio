import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const genres = [
  { id: 1, title: 'Personal Growth' },
  { id: 2, title: 'Investigative Journalism' },
  { id: 3, title: 'History' },
  { id: 4, title: 'Comedy' },
  { id: 5, title: 'Entertainment' },
  { id: 6, title: 'Business' },
  { id: 7, title: 'Fiction' },
  { id: 8, title: 'News' },
  { id: 9, title: 'Kids and Family' },
];

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Podcally</h1>
        <p>Podcasts that sound musically</p>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li 
          className="dropdown" 
          onMouseEnter={toggleDropdown} 
          onMouseLeave={toggleDropdown}
        >
          <button className="dropbtn">Genres</button>
          {dropdownOpen && (
            <div className="dropdown-content">
              {genres.map((genre) => (
                <Link key={genre.id} to={`/genre/${genre.id}`} onClick={() => setDropdownOpen(false)}>
                  {genre.title}
                </Link>
              ))}
            </div>
          )}
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
