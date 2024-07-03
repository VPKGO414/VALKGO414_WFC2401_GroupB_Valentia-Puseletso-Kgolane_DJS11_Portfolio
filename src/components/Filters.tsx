// Filters.tsx
import React, { useEffect, useState } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { getGenres } from '../utils/api';
import { Preview } from '../types';
import LoadIcon from './LoadIcon';
import '../styles/Filters.css'; // Import the CSS file for Filters

interface OptionType {
  value: string;
  label: string;
}

interface FiltersProps {
  onGenreChange: (genre: string | null) => void;
  onSortChange: (sortFunc: (a: Preview, b: Preview) => number) => void;
}

const Filters: React.FC<FiltersProps> = ({ onGenreChange, onSortChange }) => {
  const [genreNames, setGenreNames] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    async function loadGenres() {
      setLoading(true);
      handleSortChange('A-Z', (a, b) => a.title.localeCompare(b.title));
      const localGenres = await getGenres();
      const options = localGenres.map((genre) => ({
        value: genre.title.toLowerCase(),
        label: genre.title,
      }));
      setGenreNames(options);
      setLoading(false);
    }
    loadGenres();
  }, []);

  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      width: 200,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgb(30,41,59)',
      fontWeight: 500,
    }),
  };

  const handleGenreChange = (selectedOption: SingleValue<OptionType>) => {
    onGenreChange(selectedOption ? selectedOption.value : null);
  };

  const handleSortChange = (
    sortLabel: string,
    sortFunc: (a: Preview, b: Preview) => number
  ) => {
    setSelectedSort(sortLabel);
    onSortChange(sortFunc);
  };

  if (loading) {
    return (
      <div className="filters-container">
        <LoadIcon />
      </div>
    );
  }

  return (
    <div className="filters-container">
      <button
        onClick={() =>
          handleSortChange('A-Z', (a, b) => a.title.localeCompare(b.title))
        }
        className={`filter-button ${selectedSort === 'A-Z' ? 'underline' : ''}`}
      >
        A-Z
      </button>
      <button
        onClick={() =>
          handleSortChange('Z-A', (a, b) => -a.title.localeCompare(b.title))
        }
        className={`filter-button ${selectedSort === 'Z-A' ? 'underline' : ''}`}
      >
        Z-A
      </button>
      <button
        onClick={() =>
          handleSortChange(
            'Newest',
            (a, b) =>
              new Date(b.updated).getTime() - new Date(a.updated).getTime()
          )
        }
        className={`filter-button ${
          selectedSort === 'Newest' ? 'underline' : ''
        }`}
      >
        Newest
      </button>
      <button
        onClick={() =>
          handleSortChange(
            'Oldest',
            (a, b) =>
              new Date(a.updated).getTime() - new Date(b.updated).getTime()
          )
        }
        className={`filter-button ${
          selectedSort === 'Oldest' ? 'underline' : ''
        }`}
      >
        Oldest
      </button>
      <Select
        className="select-container"
        styles={customStyles}
        options={genreNames}
        isClearable={true}
        placeholder="Genres"
        onChange={handleGenreChange}
      />
    </div>
  );
};

export default Filters;

