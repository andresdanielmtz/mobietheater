import { Favorite } from "../models/Favorite";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

async function storeFavorites(review: Favorite): Promise<void> {
  await addDoc(collection(db, "favorites"), review);
}

async function getFavorites(uid: string): Promise<Favorite[]> {
    const snapshot = await getDocs(
        query(collection(db, "favorites"), where("uid", "==", uid))
    );
    const favorites: Favorite[] = [];
    snapshot.forEach((doc) => {
        favorites.push(doc.data() as Favorite);
    });
    return favorites;
}

async function removeFavorite(uid: string, movieId: string): Promise<void> {
  const snapshot = await getDocs(
    query(
      collection(db, "favorites"),
      where("uid", "==", uid),
      where("movieId", "==", movieId)
    )
  );
  if (!snapshot.empty) {
    await deleteDoc(snapshot.docs[0].ref);
  }
}

async function movieInEntry(uid: string, movieId: string): Promise<boolean> {
  const snapshot = await getDocs(
    query(
      collection(db, "favorites"),
      where("uid", "==", uid),
      where("movieId", "==", movieId)
    )
  );
  return !snapshot.empty;
}

export { storeFavorites, getFavorites, removeFavorite, movieInEntry };
