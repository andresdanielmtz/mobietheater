import "./App.css";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import NavBar from "./components/NavBar.js";
import MovieDetails from "./pages/MovieDetails.js";
import Favorites from "./pages/Favorites.js";
import Login from "./pages/Login.js";
import Signup from "./pages/SignUp.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import ProfilePage from "./pages/ProfilePage.js";
import InfoPage from "./pages/Info.js";
import { Bounce, ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />{" "}
    </>
  );
}

export default App;
