import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { Movie } from "../models/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
  const TMDB_API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`;

  useEffect(() => {
    axios.get(TMDB_API_URL).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  /**
   * ?? The spinner is now displayed on the screen while the movies are being fetched.
   */

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
          />
        ))}
      </div>
      <Footer />
    </Suspense>
  );
}
