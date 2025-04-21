import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PasswordGenerator from "./PasswordGenerator";
import TextAnalysis from "./TextAnalysis";
import Pomodoro from "./Pomodoro";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/text-analysis" element={<TextAnalysis />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
