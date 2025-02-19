import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "./Home";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";

const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const context = useContext(FavoritesContext);

  if (!context) {
    return <div>Error: FavoritesContext is not available.</div>;
  }

  const { setFavorite, favorites } = context;
  let favButtonLavel = "";

  useEffect(() => {
    axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (!favorites.has(movie.id)) {
    favButtonLavel = "Add to Favorites";
  } else {
    favButtonLavel = "Remove from Favorites";
  }

  return (
    <div>
      <div className="p-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p>⭐ {movie.vote_average}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setFavorite(movie)}
        >
          {favButtonLavel}
        </button>
      </div>
    </div>
  );
}
