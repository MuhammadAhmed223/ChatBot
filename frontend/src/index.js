import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot for React 18+
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = document.getElementById("root"); // Ensure "root" exists in index.html
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
