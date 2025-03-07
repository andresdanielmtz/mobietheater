import React, { ChangeEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from "./icons/LogoutIcon";
import { toast } from "react-toastify";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const favorites = useContext(FavoritesContext);
  const { logout, user } = useContext(AuthContext);
  let authForm;
  if (user) {
    authForm = [
      <Link to="/dashboard">{user.email}</Link>,
      <p>
        ⭐: <Link to="/favorites" title="Favorites">{favorites?.favorites.size}</Link>
      </p>,
      <form onSubmit={handleLogout} className={"float-right md:float-left"}>
        <button type="submit" className="flex align-middle bg-blue-500 px-2 py-1 rounded">
          {" "}
          <LogoutIcon />
          Logout{" "}
        </button>
      </form>,
    ];
  } else {
    const signInForm = (
      <form onSubmit={handleSignup}>
        <button
          type="submit"
          className="bg-blue-500 px-2 py-1
   rounded"
        >
          Sign Up
        </button>
      </form>
    );
    const loginForm = (
      <form onSubmit={handleLogin}>
        <button
          type="submit"
          className="bg-blue-500 px-2 py-1
   rounded"
        >
          Login
        </button>
      </form>
    );
    authForm = [signInForm, loginForm];
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  }

  function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    navigate(`/signup`);
  }
  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    navigate(`/login`);
  }
  function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    logout();
    toast.info("Logged out successfully!");
    navigate(`/`);
  }

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <Link to="/"> Home </Link>
      <Link to="/dashboard"> Dashboard </Link>
      <Link to="/profile"> Profile </Link>
      <form onSubmit={handleSearch} className="flex gap-2 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 px-2 py-1
   rounded"
        >
          �
        </button>
      </form>
      {authForm}
    </nav>
  );
}
