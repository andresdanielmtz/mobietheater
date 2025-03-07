import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Review } from "../models/Review";
import { getReviews } from "../hook/storeReview";
import Comment from "../components/Comment";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ascending, setAscending] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    getReviews(user?.uid).then((reviews) => {
      console.log(`Called getReviews with ${user?.uid}`);
      if (!reviews) {
        console.log("No reviews found.");

        return;
      }

      /**
       * Sort reviews by createdAt timestamp in descending order
       */

      const sortedReviews = [...reviews].sort((a, b) => {
        if (ascending) {
          return a.createdAt.seconds - b.createdAt.seconds;
        } else {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
      });

      setReviews(sortedReviews);
    });
  }, [user, ascending]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-4 p-4 bg-transparent border-2 border-blue-500 rounded-lg shadow-md text-white hover:border-blue-700 transition-colors duration-300">
        <h2 className="text-xl font-medium">Logged in as {user?.email}</h2>
        <p className="text-gray-400 mt-2">
          These are the most recent comments you have done.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setAscending(!ascending)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Showing: {ascending ? "Oldest" : "Newest"} first
          </button>
        </div>
      </div>
      {reviews.map((review, index) => (
        <div key={index}>
          <Comment
            text={review.review}
            userEmail={review.userEmail}
            userUid={user!.uid}
            currentDate={review.createdAt}
            originalLink={review.movieId.toString()}
          />
        </div>
      ))}
    </div>
  );
}
