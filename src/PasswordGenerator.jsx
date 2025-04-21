import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const defaultLength = 16;

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword(options) {
  const {
    length,
    useUpper,
    useLower,
    useNumbers,
    useSymbols
  } = options;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_-+=[]{}|;:,.<>?/~";

  let all = "";
  if (useUpper) all += upper;
  if (useLower) all += lower;
  if (useNumbers) all += numbers;
  if (useSymbols) all += symbols;
  if (!all) return "";

  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += getRandomChar(all);
  }
  return pw;
}

function checkStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 20) score++;
  return score;
}

const strengthLabels = [
  "Too Weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
  "Very Strong"
];
const strengthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-green-500",
  "bg-gradient-to-r from-green-500 via-blue-400 to-purple-500"
];
const strengthWidths = ["w-1/6", "w-1/4", "w-1/3", "w-1/2", "w-2/3", "w-full"];

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="text-gray-300 text-base w-24">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
        <div className="absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-200"></div>
      </div>
    </label>
  );
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(defaultLength);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [animateBtn, setAnimateBtn] = useState(false);
  const prevStrength = useRef(0);
  const navigate = useNavigate();

  function handleGenerate() {
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 200);
    const pw = generatePassword({ length, useUpper, useLower, useNumbers, useSymbols });
    setPassword(pw);
    setCopied(false);
  }

  function handleCopy() {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  const strength = checkStrength(password);
  if (strength !== prevStrength.current) {
    prevStrength.current = strength;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <button onClick={() => navigate("/")} className="absolute left-4 top-4 md:left-10 md:top-10 px-5 py-2 rounded-full bg-gray-800/70 text-blue-200 font-semibold shadow hover:bg-blue-900 transition z-10">← Back</button>
      <div className="w-full max-w-lg mx-4 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left w-full text-gray-100">Password Generator</h1>
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex-1">
            <label className="block mb-2 text-base font-medium text-gray-300">Password Length</label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400 mt-1">{length} characters</div>
          </div>
          <div className="flex flex-col gap-2">
            <ToggleSwitch label="Uppercase" checked={useUpper} onChange={setUseUpper} />
            <ToggleSwitch label="Lowercase" checked={useLower} onChange={setUseLower} />
            <ToggleSwitch label="Numbers" checked={useNumbers} onChange={setUseNumbers} />
            <ToggleSwitch label="Symbols" checked={useSymbols} onChange={setUseSymbols} />
          </div>
        </div>
        <hr className="border-gray-800 w-full mb-8" />
        <button
          onClick={handleGenerate}
          className={`w-full py-3 mb-6 rounded-xl bg-gradient-to-br from-blue-700 via-purple-700 to-gray-800 text-white text-xl font-bold shadow-lg focus:outline-none transition-transform duration-200 active:scale-95 ${animateBtn ? 'scale-105' : ''}`}
          style={{ transition: 'transform 0.2s' }}
        >
          Generate Password
        </button>
        <div className="w-full mb-6 flex flex-col items-center">
          <div className="w-full flex flex-row items-center gap-2">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 rounded-lg px-4 py-3 text-lg md:text-2xl bg-gray-800/80 text-gray-100 font-mono tracking-wide outline-none border border-gray-700 placeholder:text-gray-400"
              placeholder="Your password will appear here"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
              disabled={!password}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {password && (
            <div className="w-full mt-4">
              <div className="flex items-center gap-3">
                <div className={`h-3 rounded-full transition-all duration-500 ${strengthColors[strength]} ${strengthWidths[strength]}`}></div>
                <span className="text-gray-200 text-lg font-semibold transition-colors duration-300">{strengthLabels[strength]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Password Generator</footer>
    </div>
  );
}
