import React from "react";
import "./Landing2_Material.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing2() {
  return (
    <div className="material-bg">
      <div className="material-container">
        <header className="material-header">
          <h1 className="material-title">Retro Games Achievements</h1>
          <p className="material-subtitle">Material Design Leaderboard</p>
        </header>
        <section className="material-section achievements">
          <h2 className="material-section-title">Your Achievements</h2>
          <div className="material-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="material-achievement-card">
                <span className="material-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="material-achievement-title">{a.title}</h3>
                  <p className="material-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="material-section leaderboard">
          <h2 className="material-section-title">Leaderboard</h2>
          <div className="material-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`material-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="material-leaderboard-rank">{i + 1}</span>
                <span className="material-leaderboard-name">{entry.name}</span>
                <span className="material-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="material-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
