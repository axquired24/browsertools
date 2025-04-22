import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash";
import UnitConverter from "./UnitConverter";
import PasswordGenerator from "./PasswordGenerator";
import TextAnalysis from "./TextAnalysis";
import Pomodoro from "./Pomodoro";
import FlexGenerator from "./FlexGenerator";
import Landing1 from "./Landing1";
import Landing2 from "./Landing2";
import Landing3 from "./Landing3";
import Landing4 from "./Landing4";
import Landing5 from "./Landing5";
import Landing7 from "./Landing7";
import Landing8 from "./Landing8";
import Landing9 from "./Landing9";
import LandingsSplash from "./LandingsSplash";
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
        <Route path="/flex-generator" element={<FlexGenerator />} />
        <Route path="/landing1" element={<Landing1 />} />
        <Route path="/landing2" element={<Landing2 />} />
        <Route path="/landing3" element={<Landing3 />} />
        <Route path="/landing4" element={<Landing4 />} />
        <Route path="/landing5" element={<Landing5 />} />
        <Route path="/landing7" element={<Landing7 />} />
        <Route path="/landing8" element={<Landing8 />} />
        <Route path="/landing9" element={<Landing9 />} />
        <Route path="/landings" element={<LandingsSplash />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
