import { Review } from "../models/Review";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

async function storeReview(review: Review): Promise<void> {
  await addDoc(collection(db, "reviews"), review);
}

async function getReviews(uid: string): Promise<Review[]> {
  const snapshot = await getDocs(
    query(collection(db, "reviews"), where("userId", "==", uid))
  );
  if (!snapshot.empty) {
    return snapshot.docs.map(doc => doc.data() as Review);
  }
  return [];
}

export { storeReview, getReviews };
