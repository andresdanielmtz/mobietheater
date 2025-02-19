import "./App.css";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import NavBar from "./components/NavBar.js";
import MovieDetails from "./pages/MovieDetails.js";
import Favorites from "./pages/Favorites.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
