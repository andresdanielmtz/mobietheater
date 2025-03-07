export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
}
