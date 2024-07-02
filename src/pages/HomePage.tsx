import React, { useState, useEffect, useCallback } from 'react';
import { Preview, Genre } from './src/types';
import { getAllPreviews, getGenres } from '../services/api';
import LoadIcon from '../components/LoadIcon';
import PodcastGrid from '../components/PodcastGrid';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import AudioPlayer from '../components/AudioPlayer';
import NavBar from '../components/NavBar';
import GenreSection from '../components/GenreSection';
import HomePage from '../styles/HomePage.css';

interface HomePageProps {
    onTileClick: (show: Preview) => void;
    hidepopup: () => void;
    handleNav: (value: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({
    onTileClick,
    hidepopup,
    handleNav,
}) => {
    const [previews, setPreviews] = useState<Preview[]>([]);
    const [filteredPreviews, setFilteredPreviews] = useState<Preview[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [sortFunction, setSortFunction] = useState<
        (a: Preview, b: Preview) => number
    >(() => () => 0);

    // Fetch podcast previews and genres on component mount
    useEffect(() => {
        async function loadPreviews() {
            setLoading(true);
            try {
                const previewData = await getAllPreviews();
                setPreviews(previewData);
                setFilteredPreviews(previewData);
                const genresData = await getGenres();
                setGenres(genresData);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadPreviews();
    }, []);

    // Function to apply filters and sorting to previews
    const applyFiltersAndSort = useCallback(() => {
        let updatedPreviews = [...previews];

        if (selectedGenre) {
            const genre = genres.find(
                (g) => g.title.toLowerCase() === selectedGenre
            );
            if (genre) {
                updatedPreviews = updatedPreviews.filter((preview) =>
                    genre.shows.includes(preview.id)
                );
            }
        }

        if (searchText) {
            updatedPreviews = updatedPreviews.filter((preview) =>
                preview.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        updatedPreviews.sort(sortFunction);
        setFilteredPreviews(updatedPreviews);
    }, [previews, searchText, selectedGenre, sortFunction, genres]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
    };

    const handleGenreChange = (genre: string | null) => {
        setSelectedGenre(genre);
    };

    const handleSortChange = (sortFunc: (a: Preview, b: Preview) => number) => {
        setSortFunction(() => sortFunc);
    };

    // Loading state indicator
    if (loading) {
        return (
            <div data-ref="homepage-container">
                <LoadIcon />
            </div>
        );
    }

    // Error state handler
    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    // Generate preview tiles for filtered previews
    const previewTiles = filteredPreviews.map((preview) => (
        <PodcastGrid
            key={preview.id}
            propsPreview={preview}
            propsGenres={genres}
            onTileClick={onTileClick}
        />
    ));

    return (
        <>
            <NavBar handleNav={handleNav} /> {/* Include NavBar component */}
            <SearchBar
                onSearchTextChange={handleSearchTextChange}
                hidepopup={hidepopup}
                handleNav={handleNav}
            />
            <div data-ref="homepage-container">
                <div className="homepage-header">
                    <h1>Podcasts</h1>
                    <Filters
                        onGenreChange={handleGenreChange}
                        onSortChange={handleSortChange}
                    />
                </div>
                <hr />
                <FeaturedCarousel /> {/* Display the FeaturedCarousel component */}
                <hr />
                <GenreSection genres={genres} /> {/* Display the GenreSection component */}
                <div data-ref="tile-container">
                    {previewTiles.length === 0 ? (
                        <div>No results found.</div>
                    ) : (
                        previewTiles
                    )}
                </div>
            </div>
            <AudioPlayer /> {/* Display the AudioPlayer component */}
        </>
    );
};

export default HomePage;
