import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const TeamSnapAlternativePage = lazy(() => import("./pages/TeamSnapAlternativePage"));

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const isTeamSnapAlternativePage = normalizedPath === "/teamsnap-alternative";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {isTeamSnapAlternativePage ? <TeamSnapAlternativePage /> : <App />}
    </Suspense>
  </React.StrictMode>
);
