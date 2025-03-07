import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvatar } from "../hook/signUpAvatar";
import { formatDate } from "../utils/Date";
import { Timestamp } from "firebase/firestore";

interface CommentProps {
  text: string;
  userEmail: string;
  userUid: string;
  currentDate?: Timestamp;
  originalLink?: string;
}

const Comment = ({
  text,
  userEmail,
  userUid,
  currentDate,
  originalLink,
}: CommentProps) => {
  const [avatar, setAvatar] = useState<string>("");

  const parsedDate = currentDate ? currentDate.toDate() : null;
  useEffect(() => {
    getAvatar(userUid).then((url) => {
      setAvatar(url);
    });
  }, [userUid]);

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-lg mt-4">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-start space-x-4 flex-1">
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex flex-col flex-1">
            <Link
              to={`../../user/${userUid}`}
              relative="path"
              className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors duration-200"
            >
              {userEmail}
            </Link>
            <p className="text-sm text-white mt-1">{text}</p>
          </div>

            {originalLink && (
            <Link
              to={`../../movie/${originalLink}`}
              className="text-sm text-sky-600"
            >
              Go to original movie.
            </Link>
            )}
        </div>

        <p className="text-sm text-gray-400 ml-4">
          {parsedDate ? formatDate(parsedDate) : ""}
        </p>
      </div>
    </div>
  );
};

export default Comment;
