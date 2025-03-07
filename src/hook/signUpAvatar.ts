/**
 * @description
 */
import { JSHash, CONSTANTS } from "react-hash";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

/**
 * @description This function generates a Gravatar URL based on the user's email address.
 * @param email - The email address of the user.
 * @param size - The size of the Gravatar image.
 * @returns A promise that resolves to the Gravatar URL.
 */

async function getGravatarUrl(
  email: string,
  size: number = 80
): Promise<string> {
  const trimmedEmail = email.trim().toLowerCase();
  try {
    const hash = await JSHash(trimmedEmail, hashAlgorithm);
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  } catch {
    return `https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon`;
  }
}

/**
 * @description This function saves the user's avatar URL to the Firestore database.
 * @param {string} email - The email address of the user.
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<void>} A promise that resolves when the avatar URL is saved.
 */
export async function saveAvatar(email: string, uid: string): Promise<void> {
  getGravatarUrl(email).then(async (avatarUrl) => {
    await addDoc(collection(db, "avatars"), {
      avatarUrl,
      uid,
    });
  });
}

export async function getAvatar(uid: string) {
  const snapshot = await getDocs(
    query(collection(db, "avatars"), where("uid", "==", uid))
  );
  if (!snapshot.empty) {
    return snapshot.docs[0].data().avatarUrl;
  }
  return "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon";
}
