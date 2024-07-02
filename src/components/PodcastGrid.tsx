import React from 'react';
import { Preview, Genre } from '../utils/interfaces';

interface PodcastGridProps {
    podcasts: Preview[];
    genres: Genre[];
    onTileClick: (show: Preview) => void;
}

const PodcastGrid: React.FC<PodcastGridProps> = ({
    podcasts,
    genres,
    onTileClick,
}) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const clickHandler = (propsPreview: Preview) => {
        onTileClick(propsPreview);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {podcasts.map(podcast => {
                const {
                    id,
                    title,
                    seasons,
                    image,
                    genres: genreIds,
                    updated: updatedDateStr,
                } = podcast;
                const updatedDate = new Date(updatedDateStr);
                const updated = `${updatedDate.getDate()} ${
                    months[updatedDate.getMonth()]
                } ${updatedDate.getFullYear()}`;

                // Uses genre ids to find genre names and add them as one string
                const genreNames = genreIds
                    .map(
                        genreId =>
                            genres.find(g => Number(g.id) === genreId)?.title ||
                            ''
                    )
                    .filter(Boolean)
                    .join(', ');

                return (
                    <div
                        key={id}
                        onClick={() => clickHandler(podcast)}
                        data-ref="preview-tile"
                        className="p-4 bg-white rounded-lg cursor-pointer shadow-md hover:shadow-lg"
                    >
                        <img
                            src={image}
                            className="h-44 w-44 mb-4 rounded-lg"
                            alt={title}
                        />
                        <div className="flex flex-col">
                            <h1 className="text-slate-800 font-bold text-lg mb-1 truncate">
                                {title}
                            </h1>
                            <p className="text-slate-600 text-sm mb-1">
                                Seasons: {seasons}
                            </p>
                            <p className="text-slate-600 text-sm mb-1">
                                Genres: {genreNames}
                            </p>
                            <p className="text-slate-600 text-sm">
                                Last updated: {updated}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PodcastGrid;
