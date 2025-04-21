import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash";
import UnitConverter from "./UnitConverter";
import PasswordGenerator from "./PasswordGenerator";
import TextAnalysis from "./TextAnalysis";
import Pomodoro from "./Pomodoro";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/unit-converter" element={<UnitConverter />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/text-analysis" element={<TextAnalysis />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
