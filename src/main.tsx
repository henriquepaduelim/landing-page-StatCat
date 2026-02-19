import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TeamSnapAlternativePage from "./pages/TeamSnapAlternativePage";
import "./index.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const isTeamSnapAlternativePage = normalizedPath === "/teamsnap-alternative";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isTeamSnapAlternativePage ? <TeamSnapAlternativePage /> : <App />}
  </React.StrictMode>
);
