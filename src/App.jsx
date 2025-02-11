import './App.css'
import Home from "./pages/Home.js";
import {Link, Route, Routes} from "react-router-dom";
import Search from "./pages/Search.js";
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";

function App() {
    return (
        <>
            <nav>
                <Link to="/"> Home </Link>
                <Link to="/search"> Search </Link>
                <Link to="/dashboard"> Dashboard </Link>
                <Link to="/profile"> Profile </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </>
    )
}

export default App
