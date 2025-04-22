import React from "react";
import "./Landing4_Glass.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing4() {
  return (
    <div className="glass-bg">
      <div className="glass-container">
        <header className="glass-header">
          <h1 className="glass-title">Retro Games Achievements</h1>
          <p className="glass-subtitle">Glassmorphism Leaderboard</p>
        </header>
        <section className="glass-section achievements">
          <h2 className="glass-section-title">Your Achievements</h2>
          <div className="glass-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="glass-achievement-card">
                <span className="glass-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="glass-achievement-title">{a.title}</h3>
                  <p className="glass-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="glass-section leaderboard">
          <h2 className="glass-section-title">Leaderboard</h2>
          <div className="glass-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`glass-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="glass-leaderboard-rank">{i + 1}</span>
                <span className="glass-leaderboard-name">{entry.name}</span>
                <span className="glass-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="glass-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
