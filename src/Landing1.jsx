import React from "react";
import "./Landing1.css";

// Mock Data
const achievements = [
  { title: "High Score Master", desc: "Achieved 100,000 points in Retro Invaders", icon: "🕹️" },
  { title: "Speed Runner", desc: "Completed Pixel Quest in under 5 minutes", icon: "⏱️" },
  { title: "Arcade Collector", desc: "Unlocked all retro badges", icon: "🏅" },
  { title: "Combo King", desc: "Scored a 50-hit combo in Beat Blaster", icon: "🎵" },
];

const leaderboard = [
  { name: "PlayerOne", score: 150000 },
  { name: "RetroChamp", score: 142500 },
  { name: "PixelPro", score: 139900 },
  { name: "GameGuru", score: 133300 },
  { name: "ArcadeAce", score: 128000 },
];

export default function Landing1() {
  return (
    <div className="skeuo-bg">
      <div className="skeuo-container">
        <header className="skeuo-header">
          <h1 className="skeuo-title">🎮 Retro Games Achievements</h1>
          <p className="skeuo-subtitle">Celebrate your glory days and climb the leaderboard!</p>
        </header>
        <section className="skeuo-section achievements">
          <h2 className="skeuo-section-title">Your Achievements</h2>
          <div className="skeuo-achievements-list">
            {achievements.map((a, i) => (
              <div key={i} className="skeuo-achievement-card">
                <span className="skeuo-achievement-icon">{a.icon}</span>
                <div>
                  <h3 className="skeuo-achievement-title">{a.title}</h3>
                  <p className="skeuo-achievement-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="skeuo-section leaderboard">
          <h2 className="skeuo-section-title">Leaderboard</h2>
          <div className="skeuo-leaderboard">
            {leaderboard.map((entry, i) => (
              <div key={i} className={`skeuo-leaderboard-row ${i === 0 ? "first-place" : ""}`}>
                <span className="skeuo-leaderboard-rank">{i + 1}</span>
                <span className="skeuo-leaderboard-name">{entry.name}</span>
                <span className="skeuo-leaderboard-score">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
        <footer className="skeuo-footer">&copy; {new Date().getFullYear()} Retro Leaderboard</footer>
      </div>
    </div>
  );
}
