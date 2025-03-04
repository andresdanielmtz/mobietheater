import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "./Home";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "../components/ReviewForms";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";

const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const context = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);
  if (!context) {
    return <div>Error: FavoritesContext is not available.</div>;
  }

  const [reviews, setReviews] = useState<DocumentData[]>([]);
  {
    /** Fixed bug */
  }

  useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("movieId", "==", parseInt(id ? id : "-1"))
    );

    getDocs(q).then((snapshot) => {
      setReviews(snapshot.docs.map((doc) => doc.data()));
    });
  }, [id, reviews]);

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

  let reviewForm;
  if (user) {
    reviewForm = <ReviewForm movieId={movie.id} />;
  }

  let reviewDisplay;
  if (reviews) {
    reviewDisplay = (
      <div className="p-4">
        <h1>Reviews</h1>
        {reviews.map((r, index) => (
          <p style={{ textAlign: "right" }} key={index}>
            <strong>{r.review}</strong>
            <br />
            by: {r.userEmail}
          </p>
        ))}
      </div>
    );
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
        {reviewForm}
        <br />
        {reviewDisplay}
        <br />
      </div>
    </div>
  );
}
