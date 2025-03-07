import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Favorite } from "../models/Favorite";
import { AuthContext } from "../context/AuthContext";
import { getFavorites } from "../hook/storeFavorites";
import { Movie } from "../models/Movie";
export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { user } = useContext(AuthContext);
  const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
  const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;
  const [movies, setMovies] = useState<Movie[]>([]);

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
