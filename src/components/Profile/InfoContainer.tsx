/**
 * Info container, used in Profile.
 */

import LazyImage from "../LazyImage";

interface InfoContainer {
  username?: string;
  bio?: string;
  avatar?: string;
}
const InfoContainer = ({ username, bio, avatar }: InfoContainer) => {
  return (
    <div className="flex flex-col items-center p-4 bg-transparent shadow-md rounded-lg">
      <LazyImage
        src={avatar || "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"}
        alt={username || "User avatar"}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{username}</h2>

      <div className="flex flex-col items-center">
        <p className="text-center text-gray-500">"{bio}"</p>
      </div>
    </div>
  );
};

export default InfoContainer;
