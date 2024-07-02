import React, { useEffect, useState } from 'react';
import { getEpisode, getSeason, getShow } from '../utils/Api';
import LoadIcon from '../components/LoadIcon';
import '../styles/FavouriteEpisodes.css';

interface FavEpisode {
    showId: string;
    seasonNum: number;
    episodeNum: number;
    dateAdded: Date;
}

interface DisplayShow {
    showId: string;
    title: string;
    seasons: DisplaySeason[];
    updated: string;
}

interface DisplaySeason {
    seasonNum: number;
    episodes: DisplayEpisode[];
}

interface DisplayEpisode {
    episodeNum: number;
    dateAdded: string;
}

export default function Favourites() {
    const [favEpisodeStrings, setFavEpisodeStrings] = useState<(string | null)[]>([]);
    const [favEpisodes, setFavEpisodes] = useState<(FavEpisode | null)[]>([]);
    const [displayItems, setDisplayItems] = useState<DisplayShow[]>([]);
    const [renderedShows, setRenderedShows] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState(false);
    const [isRemoveClicked, setIsRemovedClicked] = useState(false);
    const [isRemoveAllClicked, setIsRemovedAllClicked] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
    ];

    // Loads the favourites from localstorage using unique id
    useEffect(() => {
        async function loadLocalStorage() {
            setSelectedFilter('');
            const localEpisodes: (string | null)[] = [];
            Object.keys(localStorage).forEach(key => {
                if (!key.endsWith('_audio') && !key.endsWith('_ended')) {
                    localEpisodes.push(localStorage.getItem(key));
                }
            });
            setFavEpisodeStrings([...localEpisodes]);
        }
        loadLocalStorage();
    }, [isRemoveClicked, isRemoveAllClicked]);

    // Loading the episodes and storing them as FavEpisodes
    useEffect(() => {
        async function loadEpisodes() {
            const newFavEpisodes: (FavEpisode | null)[] = favEpisodeStrings.map(
                episode => {
                    try {
                        return episode ? (JSON.parse(episode) as FavEpisode) : null;
                    } catch (e) {
                        return null;
                    }
                }
            );
            setFavEpisodes(newFavEpisodes.filter(episode => episode !== null));
        }
        loadEpisodes();
    }, [favEpisodeStrings]);

    // Using FavEpisodes to create objects that are then readable for display
    useEffect(() => {
        async function createDisplayShows() {
            const items: DisplayShow[] = [];

            for (const episode of favEpisodes) {
                if (episode) {
                    let show = items.find(item => item.showId === episode.showId);
                    if (!show) {
                        const showData = await getShow(episode.showId);
                        show = {
                            showId: episode.showId,
                            title: showData.title,
                            seasons: [],
                            updated: showData.updated.toString(),
                        };
                        items.push(show);
                    }

                    let season = show.seasons.find(season => season.seasonNum === episode.seasonNum);
                    if (!season) {
                        season = { seasonNum: episode.seasonNum, episodes: [] };
                        show.seasons.push(season);
                    }

                    const displayEpisode: DisplayEpisode = {
                        episodeNum: episode.episodeNum,
                        dateAdded: episode.dateAdded.toString(),
                    };

                    season.episodes.push(displayEpisode);
                }
            }
            setDisplayItems(items);
        }
        createDisplayShows();
    }, [favEpisodes]);

    // Uses the DisplayShow objects to fetch data from api and display it
    async function fetchAndDisplayShows() {
        setLoading(true);
        const elements: JSX.Element[] = [];

        for (const show of displayItems) {
            const showData = await getShow(show.showId);
            const showImage = showData.image;
            const showTitle = showData.title;
            const numOfSeasons = showData.seasons.length;
            const lastUpdatedDate = new Date(show.updated);
            const lastUpdatedString = `${lastUpdatedDate.getDate()} ${months[lastUpdatedDate.getMonth()]} ${lastUpdatedDate.getFullYear()}`;

            show.seasons.sort((a, b) => a.seasonNum - b.seasonNum);
            const seasonElements: JSX.Element[] = [];
            for (const season of show.seasons) {
                const seasonData = await getSeason(show.showId, season.seasonNum);
                const seasonTitle = `Season ${season.seasonNum}`;

                const episodeElements: JSX.Element[] = [];

                season.episodes.sort((a, b) => a.episodeNum - b.episodeNum);
                for (const episode of season.episodes) {
                    const episodeData = await getEpisode(seasonData, episode.episodeNum);
                    const episodeAdded = new Date(episode.dateAdded);
                    const episodeTitle = `${episode.episodeNum}. ${episodeData.title} - Added: ${episodeAdded.getHours().toString().padStart(2, '0')}:${episodeAdded.getMinutes()}, ${episodeAdded.getDate()} ${months[episodeAdded.getMonth()]} ${episodeAdded.getFullYear()}`;

                    episodeElements.push(
                        <li
                            id={`${show.showId}_${season.seasonNum}_${episode.episodeNum}`}
                            key={`${show.showId}-${season.seasonNum}-${episode.episodeNum}`}>
                            <button onClick={handleRemove}>x</button>
                            {episodeTitle}
                        </li>
                    );
                }

                seasonElements.push(
                    <div key={`${show.showId}-${season.seasonNum}`}>
                        <h3>{seasonTitle}</h3>
                        <ul>{episodeElements}</ul>
                    </div>
                );
            }

            elements.push(
                <div key={show.showId} data-ref="show-container">
                    <hr />
                    <div>
                        <img src={showImage} alt={`${showTitle} image`} />
                        <div>
                            <h2>{showTitle}</h2>
                            <p>Number of Seasons: {numOfSeasons}</p>
                            <p>Last Updated: {lastUpdatedString}</p>
                        </div>
                    </div>
                    {seasonElements}
                </div>
            );
        }
        setRenderedShows(elements);
        setLoading(false);
    }

    // Rerenders every time the items array containing displayable items change
    useEffect(() => {
        fetchAndDisplayShows();
    }, [displayItems]);

    // Removes the chosen episode
    function handleRemove(event: React.MouseEvent<HTMLButtonElement>) {
        const localStorageItem = event.currentTarget.parentElement?.getAttribute('id');
        if (localStorageItem) {
            localStorage.removeItem(localStorageItem);
            setIsRemovedClicked(!isRemoveClicked);
        }
    }

    // Checks the chosen sort and applies correct sorting method to the array
    function handleSort(event: React.MouseEvent<HTMLButtonElement>) {
        const filterChosen = event.currentTarget.innerText;
        setSelectedFilter(filterChosen);

        if (filterChosen) {
            switch (filterChosen) {
                case 'A-Z': {
                    const sortedItems = [...displayItems].sort((a, b) => {
                        return a.title.localeCompare(b.title, undefined, { numeric: true });
                    });
                    setDisplayItems(sortedItems);
                    break;
                }
                case 'Z-A': {
                    const sortedItems = [...displayItems].sort((a, b) => {
                        return b.title.localeCompare(a.title, undefined, { numeric: true });
                    });
                    setDisplayItems(sortedItems);
                    break;
                }
                case 'Newest': {
                    const sortedItems = [...displayItems].sort((a, b) => {
                        const dateA = new Date(a.updated);
                        const dateB = new Date(b.updated);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setDisplayItems(sortedItems);
                    break;
                }
                case 'Oldest': {
                    const sortedItems = [...displayItems].sort((a, b) => {
                        const dateA = new Date(a.updated);
                        const dateB = new Date(b.updated);
                        return dateA.getTime() - dateB.getTime();
                    });
                    setDisplayItems(sortedItems);
                    break;
                }
            }
        }
    }

    // Removes all favourites
    function handleRemoveAll() {
        if (confirm('Are you sure you want to clear all favourites?')) {
            Object.keys(localStorage).forEach(key => {
                if (!key.endsWith('_audio')) {
                    localStorage.removeItem(key);
                }
            });
            setIsRemovedAllClicked(!isRemoveAllClicked);
        }
    }

    // Loading state
    if (loading) {
        return (
            <div data-ref="dashboard-container">
                <LoadIcon />
            </div>
        );
    }

    return (
        <div data-ref="favourites-container">
            <div>
                <h1>Favourites</h1>
                <span>
                    <button onClick={handleSort} className={selectedFilter === 'A-Z' ? 'selected' : ''}>A-Z</button>
                    <button onClick={handleSort} className={selectedFilter === 'Z-A' ? 'selected' : ''}>Z-A</button>
                    <button onClick={handleSort} className={selectedFilter === 'Newest' ? 'selected' : ''}>Newest</button>
                    <button onClick={handleSort} className={selectedFilter === 'Oldest' ? 'selected' : ''}>Oldest</button>
                </span>
            </div>
            {renderedShows.length === 0 ? (
                <p>No favourites</p>
            ) : (
                <div>
                    {renderedShows}
                </div>
            )}
            <div>
                <button onClick={handleRemoveAll}>Clear All Favourites</button>
            </div>
        </div>
    );
}
