import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import InfoContainer from "../components/Profile/InfoContainer";

interface UserProfile {
  username?: string;
  bio?: string;
  email?: string;
  avatar?: string;
}

/**
 * Renders a user's profile page by:
 * - Extracting the user ID from the URL.
 * - Fetching user data from Firestore and storing it in component state.
 * - Displaying a loading state until the data is retrieved.
 * - Showing user details (username, bio, email) if available.
 * - Handling cases where no profile is found.
 *
 * @component
 * @returns A React component that displays the user's profile or a loading message.
 */

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
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>Profile Page</h1>
      {profile ? (
        <InfoContainer username={profile.username} bio={profile.bio} avatar={profile.avatar}/>
      ) : (
        <p>User profile not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
