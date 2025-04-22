import React from "react";
import "./Landing7_Dark.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing7() {
  return (
    <div className="dark-bg">
      <div className="dark-container">
        <header className="dark-header">
          <h1 className="dark-title">Retro Games Achievements</h1>
          <p className="dark-subtitle">Dark Mode Leaderboard</p>
        </header>
        <section className="dark-section achievements">
          <h2 className="dark-section-title">Your Achievements</h2>
          <div className="dark-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="dark-achievement-card">
                <span className="dark-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="dark-achievement-title">{a.title}</h3>
                  <p className="dark-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="dark-section leaderboard">
          <h2 className="dark-section-title">Leaderboard</h2>
          <div className="dark-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`dark-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="dark-leaderboard-rank">{i + 1}</span>
                <span className="dark-leaderboard-name">{entry.name}</span>
                <span className="dark-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="dark-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
