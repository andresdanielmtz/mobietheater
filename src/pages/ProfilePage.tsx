import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

interface UserProfile {
  username?: string;
  bio?: string;
  email?: string;
}

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "users", id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false) ;
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <h2>{profile.username || "No Username"}</h2>
          <p>{profile.bio || "No Bio available"}</p>
          <p>{profile.email && `Email: ${profile.email}`}</p>
        </div>
      ) : (
        <p>User profile not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
