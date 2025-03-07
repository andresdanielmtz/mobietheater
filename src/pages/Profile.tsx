import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LazyImage from "../components/LazyImage";
import { getAvatar } from "../hook/signUpAvatar";
export default function Profile() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const auth = getAuth();
  const [profilePic, setProfilePic] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
          setBio(docSnap.data().bio);
        }
      });
    }
  }, [user]);

  /**
   * Fetches the user's avatar from the database and sets it in the component state.
   */

  onAuthStateChanged(auth, (user) => {
    if (user) {
      getAvatar(user.uid).then((url) => {
        setProfilePic(url);
      });
    }
  });

  async function handleSave() {
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          bio: bio,
        });
        alert("Profile Updated!");
        navigate("/profile");
      } catch (e) {
        alert((e as Error).message);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-transparent rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <div className="flex justify-center mb-4">
        <LazyImage
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
          Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
          Bio:
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
}
