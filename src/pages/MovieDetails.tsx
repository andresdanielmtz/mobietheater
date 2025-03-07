import {
  useEffect,
  useState,
  useContext,
  lazy,
  Suspense,
  ReactNode,
} from "react";
const LazyImage = lazy(() => import("../components/LazyImage"));
import { useParams } from "react-router-dom";
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
import {
  movieInEntry,
  removeFavorite,
  storeFavorites,
} from "../hook/storeFavorites";

const TMDB_API_KEY = import.meta.env.VITE_MDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const context = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);
  const [ascending, setAscending] = useState<boolean>(false);

  if (!context) {
    return <div>Error: FavoritesContext is not available.</div>;
  }

  const [reviews, setReviews] = useState<DocumentData[]>([]);

  useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("movieId", "==", parseInt(id ? id : "-1"))
    );
    getDocs(q).then((snapshot) => {
      const fetchedReviews = snapshot.docs.map((doc) => doc.data());
      const sortedReviews = fetchedReviews.sort((a, b) => {
        if (ascending) {
          return a.createdAt - b.createdAt;
        } else {
          return b.createdAt - a.createdAt;
        }
      });
      setReviews(sortedReviews);
    });
  }, [id, reviews]);

  const { setFavorite, favorites } = context;

  const handleFavorite = async () => {
    if (!movie) {
      return;
    }
    if (!favorites.has(movie.id)) {
      setFavorite(movie);
    } else {
      setFavorite(movie);
    }

    if (user && (await movieInEntry(user.uid, movie.id.toString()))) {
      removeFavorite(user.uid, movie.id.toString());
    } else if (user) {
      storeFavorites({
        uid: user.uid,
        movieId: movie.id.toString(),
      });
    }
  };

  let favButtonLabel = "";

  useEffect(() => {
    axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (!favorites.has(movie.id)) {
    favButtonLabel = "Add to Favorites";
  } else {
    favButtonLabel = "Remove from Favorites";
  }

  let reviewForm;
  if (user) {
    reviewForm = <ReviewForm movieId={movie.id} />;
  }

  let reviewDisplay;
  if (reviews) {
    reviewDisplay = (
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Reviews</h2>

        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold px-4 py-2 rounded-md transition-all duration-300 shadow-md mb-4"
          onClick={() => setAscending(!ascending)}
        >
          {ascending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {ascending ? "Oldest First" : "Newest First"}
        </button>

        {reviews.map((r, index) => (
          <Comment
            key={index}
            text={r.review}
            userEmail={r.userEmail}
            userUid={r.userId}
            currentDate={r.createdAt}
          />
        ))}
        {reviews.length === 0 && (
          <p className="text-gray-400">No reviews found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-5">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"></div>
          </div>
        }
      >
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 text-white rounded-2xl shadow-2xl max-w-6xl mx-auto p-8 gap-12">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 min-w-[250px]">
            <LazyImage
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>

            <div className="flex flex-col flex-1 space-y-6 text-left">
            <h1 className="text-5xl font-extrabold tracking-wide text-white">
              {movie.title}
            </h1>
            <p className="text-lg text-yellow-400 flex items-center gap-2">
              ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>

            <button
              className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
              onClick={handleFavorite}
            >
              {favButtonLabel}
            </button>

            <div className="w-full space-y-6">
              {reviewForm}

              <div className="border-t border-gray-700 pt-6">
              {reviewDisplay}
              </div>
            </div>
            </div>
        </div>
      </Suspense>
    </div>
  );
}