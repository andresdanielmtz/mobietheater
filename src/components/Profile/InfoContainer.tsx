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
    <div className="flex flex-col items-center">
      <LazyImage
        src={avatar || "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"}
        alt={username || "User avatar"}
        className="w-24 h-24 rounded-full"
      />
      <h2>{username}</h2>

      <div className="flex flex-col items-center">
        <h5> Biography </h5>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default InfoContainer;
