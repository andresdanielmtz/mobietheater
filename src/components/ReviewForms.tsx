import { useState, useContext } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
export default function ReviewForm({ movieId }: { movieId: number }) {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    const currentDate = new Date();

    e.preventDefault();
    if (user) {
      await addDoc(collection(db, "reviews"), {
        movieId,
        review,
        userEmail: user.email,
        userId: user.uid,
        createdAt: currentDate
      });
      setReview("");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write a review..."
        className="p-2 border"
      />
      <br />
      <br />
      <button
        type="submit"
        className="bg-green-500 text-white p-
2"
      >
        Submit
      </button>
    </form>
  );
}
