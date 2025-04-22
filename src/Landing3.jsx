import React from "react";
import "./Landing3_Neumorph.css";
import { achievements, leaderboard } from "./landingData";

export default function Landing3() {
  return (
    <div className="neumorph-bg">
      <div className="neumorph-container">
        <header className="neumorph-header">
          <h1 className="neumorph-title">Retro Games Achievements</h1>
          <p className="neumorph-subtitle">Neumorphism Leaderboard</p>
        </header>
        <section className="neumorph-section achievements">
          <h2 className="neumorph-section-title">Your Achievements</h2>
          <div className="neumorph-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="neumorph-achievement-card">
                <span className="neumorph-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="neumorph-achievement-title">{a.title}</h3>
                  <p className="neumorph-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="neumorph-section leaderboard">
          <h2 className="neumorph-section-title">Leaderboard</h2>
          <div className="neumorph-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`neumorph-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="neumorph-leaderboard-rank">{i + 1}</span>
                <span className="neumorph-leaderboard-name">{entry.name}</span>
                <span className="neumorph-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="neumorph-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
