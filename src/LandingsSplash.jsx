import React from "react";
import { Link } from "react-router-dom";

const landingPages = [
  { path: "/landing1", label: "Skeuomorphism" },
  { path: "/landing2", label: "Material Design" },
  { path: "/landing3", label: "Neumorphism (Soft UI)" },
  { path: "/landing4", label: "Glassmorphism" },
  { path: "/landing5", label: "Minimalist/Flat Design" },
  { path: "/landing7", label: "Dark Mode" },
  { path: "/landing8", label: "Brutalism" },
  { path: "/landing9", label: "Corporate/Enterprise UI" },
];

export default function LandingsSplash() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 8px 32px rgba(60,60,60,0.10)", padding: 40, maxWidth: 480, width: "100%" }}>
        <h1 style={{ textAlign: "center", marginBottom: 32, fontSize: 32, fontWeight: 700, color: "#333" }}>Explore Landing Page Styles</h1>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {landingPages.map((page, i) => (
            <li key={page.path} style={{ marginBottom: 20 }}>
              <Link to={page.path} style={{
                display: "block",
                padding: "18px 24px",
                borderRadius: 14,
                background: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600,
                fontSize: 18,
                textDecoration: "none",
                boxShadow: "0 2px 8px #bbdefb",
                border: "1.5px solid #1976d2",
                transition: "background 0.2s, color 0.2s"
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#1976d2'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#e3f2fd'; e.currentTarget.style.color = '#1976d2'; }}
              >
                {page.label} <span style={{ float: "right", fontWeight: 400, fontSize: 15, color: "#888" }}>{page.path}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
