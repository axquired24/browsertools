import React from "react";
import "./Landing8_Brutal.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing8() {
  return (
    <div className="brutal-bg">
      <div className="brutal-container">
        <header className="brutal-header">
          <h1 className="brutal-title">Retro Games Achievements</h1>
          <p className="brutal-subtitle">Brutalism Leaderboard</p>
        </header>
        <section className="brutal-section achievements">
          <h2 className="brutal-section-title">Your Achievements</h2>
          <div className="brutal-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="brutal-achievement-card">
                <span className="brutal-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="brutal-achievement-title">{a.title}</h3>
                  <p className="brutal-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="brutal-section leaderboard">
          <h2 className="brutal-section-title">Leaderboard</h2>
          <div className="brutal-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`brutal-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="brutal-leaderboard-rank">{i + 1}</span>
                <span className="brutal-leaderboard-name">{entry.name}</span>
                <span className="brutal-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="brutal-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
