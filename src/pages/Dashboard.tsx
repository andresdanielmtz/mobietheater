import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Movie } from "../models/Movie";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [favorites, setFavorites] = useState<Movie[]>([]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <h2> Logged in as {user?.email}</h2>


      
    </div>
  );
}
