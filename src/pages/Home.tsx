import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
  const TMDB_API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`;

  useEffect(() => {
    axios.get(TMDB_API_URL).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
