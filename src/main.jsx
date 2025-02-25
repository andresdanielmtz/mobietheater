import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.js";
import { AuthProvider } from "./context/AuthContext.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
