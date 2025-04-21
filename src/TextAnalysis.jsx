import React, { useState, useMemo } from "react";

function getStats(text) {
  const words = text.match(/\b\w+\b/g) || [];
  const characters = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  return { words: words.length, characters, sentences, paragraphs };
}

function getReadingTime(words) {
  const wpm = 200; // average reading speed
  return words === 0 ? 0 : Math.ceil(words / wpm);
}

function getKeywordFrequency(text) {
  const words = (text.match(/\b\w+\b/g) || []).map(w => w.toLowerCase());
  const freq = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  return sorted;
}

export default function TextAnalysis() {
  const [text, setText] = useState("");

  const stats = useMemo(() => getStats(text), [text]);
  const readingTime = useMemo(() => getReadingTime(stats.words), [stats.words]);
  const freq = useMemo(() => getKeywordFrequency(text), [text]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <div className="w-full max-w-2xl mx-4 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left w-full text-gray-100">Text Analysis</h1>
        <textarea
          className="w-full h-40 md:h-52 rounded-lg p-4 text-lg bg-gray-800/80 text-gray-100 border border-gray-700 mb-6 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
          <Stat label="Words" value={stats.words} />
          <Stat label="Characters" value={stats.characters} />
          <Stat label="Sentences" value={stats.sentences} />
          <Stat label="Paragraphs" value={stats.paragraphs} />
        </div>
        <div className="w-full mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 text-gray-300 text-lg">
            <span className="font-semibold text-gray-100">Estimated Reading Time:</span> {readingTime} min
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Top Keywords</h2>
          <table className="w-full text-left text-gray-200">
            <thead>
              <tr>
                <th className="pb-1">Word</th>
                <th className="pb-1">Count</th>
              </tr>
            </thead>
            <tbody>
              {freq.map(([word, count]) => (
                <tr key={word}>
                  <td className="py-1 pr-4 font-mono">{word}</td>
                  <td className="py-1">{count}</td>
                </tr>
              ))}
              {freq.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-2 text-gray-500 text-center">No keywords found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Text Analysis</footer>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-gray-800/70 rounded-lg p-3">
      <span className="text-2xl font-bold text-blue-400">{value}</span>
      <span className="text-xs text-gray-300 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}
