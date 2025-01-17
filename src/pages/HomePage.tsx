import React, { useState, useEffect, useCallback } from 'react';
import { Preview, Genre } from '../interfaces';
import { getAllPreviews, getGenres } from '../utils/api';
import LoadIcon from '../components/LoadIcon';
import PodcastGrid from '../components/PodcastGrid';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import AudioPlayer from '../components/AudioPlayer';
import NavBar from '../components/NavBar';
import GenreSection from '../components/GenreSection';
import '../styles/HomePage.css';

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

    const handleTileClick = (preview: Preview) => {
        onTileClick(preview);
    };

    if (loading) {
        return (
            <div className="homepage-container">
                <LoadIcon />
            </div>
        );
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <div className="homepage-container">
            <NavBar handleNav={handleNav} />
            <SearchBar
                onSearchTextChange={handleSearchTextChange}
                hidepopup={hidepopup}
                handleNav={handleNav}
            />
            <div className="homepage-content">
                <div className="homepage-header">
                    <h1>Podcasts</h1>
                    <Filters
                        onGenreChange={handleGenreChange}
                        onSortChange={handleSortChange}
                    />
                </div>
                <hr />
                <FeaturedCarousel />
                <hr />
                <GenreSection genres={genres} />
                <div className="podcast-grid">
                    <PodcastGrid
                        podcasts={filteredPreviews.map((preview) => ({
                            id: preview.id,
                            title: preview.title,
                            image: preview.image,
                            description: preview.description,
                        }))}
                    />
                </div>
            </div>
            <AudioPlayer />
        </div>
    );
};

export default HomePage;
