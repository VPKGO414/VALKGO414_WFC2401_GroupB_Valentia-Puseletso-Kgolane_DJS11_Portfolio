export interface Preview {
    id: string;
    title: string;
    image: string;
    description: string;
    season: number;
    showTitle: string;
    addedDate: string;
    showId: string;
    audioUrl: string;
  }
  
  export interface Episode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
  }
  
  export interface Show {
    id: string;
    title: string;
    description: string;
    image: string;
    episodes: Episode[];
    seasons: Season[];
    genres: Genre[];
  }
  
  export interface Genre {
    id: number;
    name: string;
    podcasts: Podcast[];
  }
  
  export interface Season {
    number: number;
    episodes: Episode[];
  }
  
  export interface Podcast {
    id: number;
    title: string;
    description: string;
    image: string;
  }