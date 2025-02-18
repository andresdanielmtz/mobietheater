import "./App.css";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
