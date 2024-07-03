import { Preview, Show, Season, Episode, Genre } from './interfaces';

// Fetches all previews from the API
export async function getAllPreviews(): Promise<Preview[]> {
    const response = await fetch('https://podcast-api.netlify.app');
    if (!response.ok) {
        throw new Error(`Failed to fetch podcast info: ${response.statusText}`);
    }
    const previews: Preview[] = await response.json();
    return previews;
}

// Fetches an individual show from the API
export async function getShow(showId: string): Promise<Show> {
    const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch podcast: ${response.statusText}`);
    }
    const podcast: Show = await response.json();
    return podcast;
}

// Fetches a season according to show ID
export async function getSeason(showId: string, seasonNum: number): Promise<Season> {
    const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch podcast info: ${response.statusText}`);
    }
    const show: Show = await response.json();
    const season: Season = show.seasons[seasonNum - 1];
    if (!season) {
        throw new Error(`Season ${seasonNum} not found for show ID ${showId}`);
    }
    return season;
}

// Retrieves an episode from a season
export function getEpisode(season: Season, episodeNum: number): Episode {
    const episode: Episode = season.episodes[episodeNum - 1];
    if (!episode) {
        throw new Error(`Episode ${episodeNum} not found for season`);
    }
    return episode;
}

// Fetches all genres from the API
export async function getGenres(): Promise<Genre[]> {
    let genreArray: Genre[] = [];

    try {
        const previews = await getAllPreviews();
        const genreIdSet = new Set<string>();

        previews.forEach(preview => {
            preview.genres.forEach(genreId => {
                genreIdSet.add(genreId);
            });
        });

        const genreIdArray = Array.from(genreIdSet);

        for (let i = 0; i < genreIdArray.length; i++) {
            const response = await fetch(`https://podcast-api.netlify.app/genre/${genreIdArray[i]}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch podcast genres: ${response.statusText}`);
            }
            const genre: Genre = await response.json();
            genreArray.push(genre);
        }
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }

    return genreArray;
}
