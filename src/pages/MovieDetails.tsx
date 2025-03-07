import {
  useEffect,
  useState,
  useContext,
  lazy,
  Suspense,
  ReactNode,
} from "react";
const LazyImage = lazy(() => import("../components/LazyImage"));
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movie } from "../models/Movie";
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
import Comment from "../components/Comment";

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
          <Comment
            key={index}
            text={r.review}
            userEmail={r.userEmail}
            userUid={r.userId}
            currentDate={r.createdAt}
          />
        ))}
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto p-8 gap-8">
        <div className="w-1/3 min-w-[250px]">
          <LazyImage
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg text-yellow-400 flex items-center gap-2">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            onClick={() => setFavorite(movie)}
          >
            {favButtonLavel}
          </button>

          <div className="w-full space-y-4">
            {reviewForm}
            <div className="border-t border-gray-700 pt-4">{reviewDisplay}</div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
