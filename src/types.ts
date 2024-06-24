export interface Preview {
    id: string;
    title: string;
    image: string;
  }
  
  export interface Episode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
  }
  
  export interface Podcast {
    id: string;
    title: string;
    description: string;
    image: string;
    episodes: Episode[];
  }
  
  export interface Genre {
    id: number;
    name: string;
    podcasts: Podcast[];
  }