import "./index.css";
import "../node_modules/leaflet/dist/leaflet.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import AuthProvider from "./context/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
