import { Review } from "../models/Review";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

async function storeReview(review: Review): Promise<void> {
  await addDoc(collection(db, "reviews"), review);
}

async function getReviews(uid: string): Promise<Review | undefined> {
  const snapshot = await getDocs(
    query(collection(db, "reviews"), where("uid", "==", uid))
  );
  if (!snapshot.empty) {
    return snapshot.docs[0].data() as Review;
  }
}

export { storeReview, getReviews };
