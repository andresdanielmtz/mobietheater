import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Movie } from "../models/Movie";
import { getFavorites } from "../hook/storeFavorites";
import { Favorite } from "../models/Favorite";
import MovieCard from "../components/MovieCard";
export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const { user } = useContext(AuthContext);
  const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
  const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

  // ${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getFavorites(user?.uid).then((favorites) => {
      if (!favorites) {
        return;
      }
      setFavorites(favorites);
    });
  }, [user]);

  useEffect(() => {
    favorites.map((favorite) => {
      fetch(`${TMDB_API_URL}/${favorite.movieId}?api_key=${TMDB_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies((movies) => [...movies, data]);
        });
    });
  }, [favorites]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <h2> Logged in as {user?.email}</h2>

      {favorites.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mt-4">Favorites</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {movies.map((movie) => (
              <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}
