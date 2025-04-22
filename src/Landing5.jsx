import React from "react";
import "./Landing5_Minimal.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing5() {
  return (
    <div className="minimal-bg">
      <div className="minimal-container">
        <header className="minimal-header">
          <h1 className="minimal-title">Retro Games Achievements</h1>
          <p className="minimal-subtitle">Minimalist Leaderboard</p>
        </header>
        <section className="minimal-section achievements">
          <h2 className="minimal-section-title">Your Achievements</h2>
          <div className="minimal-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="minimal-achievement-card">
                <span className="minimal-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="minimal-achievement-title">{a.title}</h3>
                  <p className="minimal-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="minimal-section leaderboard">
          <h2 className="minimal-section-title">Leaderboard</h2>
          <div className="minimal-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`minimal-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="minimal-leaderboard-rank">{i + 1}</span>
                <span className="minimal-leaderboard-name">{entry.name}</span>
                <span className="minimal-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="minimal-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
