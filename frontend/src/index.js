import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import { FieldProvider } from "./context/FieldContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FieldProvider>
      <App />
    </FieldProvider>
  </React.StrictMode>
);