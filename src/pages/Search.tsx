import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Movie } from "./Home";
export default function Search() {
  const location = useLocation();
  const [movie, setMovies] = useState<Movie[]>([]);

  const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
  const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    axios
      .get(TMDB_API_URL, {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [query]);

  return (
    <h1 className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {movie.map((movie) => (
        <MovieCard
          id={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={movie.vote_average}
        />
      ))}
    </h1>
  );
}
