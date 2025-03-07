/**
 * @description
 */
import { createHash } from "crypto";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * @description This function generates a Gravatar URL based on the user's email address.
 */

function getGravatarUrl(email: string, size = 80) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = createHash("sha256").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

/**
 *
 * @param email
 * @param uid
 * @description This function saves the user's Gravatar URL to the Firestore database.
 */

export function saveAvatar(email: string, uid: string): void {
  const avatarUrl = getGravatarUrl(email);
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((docSnap) => {
    if (docSnap.exists()) {
      updateDoc(userRef, {
        avatar: avatarUrl,
      });
    }
  });
}
