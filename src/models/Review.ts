import { Timestamp } from "firebase/firestore";

export interface Review {
    movieId: number;
    userEmail: string;
    review : string;
    createdAt: Timestamp;
  }