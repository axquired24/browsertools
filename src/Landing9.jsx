import React from "react";
import "./Landing9_Corp.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing9() {
  return (
    <div className="corp-bg">
      <div className="corp-container">
        <header className="corp-header">
          <h1 className="corp-title">Retro Games Achievements</h1>
          <p className="corp-subtitle">Enterprise UI Leaderboard</p>
        </header>
        <section className="corp-section achievements">
          <h2 className="corp-section-title">Your Achievements</h2>
          <div className="corp-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="corp-achievement-card">
                <span className="corp-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="corp-achievement-title">{a.title}</h3>
                  <p className="corp-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="corp-section leaderboard">
          <h2 className="corp-section-title">Leaderboard</h2>
          <div className="corp-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`corp-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="corp-leaderboard-rank">{i + 1}</span>
                <span className="corp-leaderboard-name">{entry.name}</span>
                <span className="corp-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="corp-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
