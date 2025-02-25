import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <h2> Logged in as {user?.email}</h2>
    </div>
  );
}
