import React, { useState, useRef, useEffect } from "react";

const MODES = [
  { name: "Focus", minutes: 25, color: "from-blue-600 to-blue-900" },
  { name: "Break", minutes: 5, color: "from-green-500 to-green-800" },
  { name: "Long Break", minutes: 15, color: "from-purple-600 to-purple-900" }
];

const MODE_KEYS = ['focus', 'break', 'longBreak'];

const DEFAULTS = {
  focus: 25,
  break: 5,
  longBreak: 15
};

const motivationalQuotes = [
  "Stay focused and never give up!",
  "Small steps every day lead to big results.",
  "Your only limit is your mind.",
  "Productivity is never an accident.",
  "Success is the sum of small efforts, repeated."
];

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Pomodoro() {
  const [mode, setMode] = useState(0); // 0: focus, 1: break, 2: long break
  const [durations, setDurations] = useState({ ...DEFAULTS });
  const [seconds, setSeconds] = useState(DEFAULTS.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Pick a random quote on mount
  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSeconds((sec) => {
        if (sec > 1) return sec - 1;
        clearInterval(timerRef.current);
        handleTimerEnd();
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [isRunning]);

  function handleTimerEnd() {
    if (soundOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (mode === 0) {
      setSessionCount((c) => c + 1);
      if (autoSwitch) setMode(sessionCount % 4 === 3 ? 2 : 1);
      if (autoSwitch) setSeconds((sessionCount % 4 === 3 ? durations.longBreak : durations.break) * 60);
    } else {
      if (autoSwitch) setMode(0);
      if (autoSwitch) setSeconds(durations.focus * 60);
    }
    setIsRunning(false);
  }

  function startTimer() {
    setIsRunning(true);
  }
  function pauseTimer() {
    setIsRunning(false);
  }
  function resetTimer() {
    setIsRunning(false);
    setSeconds(durations[MODE_KEYS[mode]] * 60);
  }
  function handleModeChange(idx) {
    setMode(idx);
    setIsRunning(false);
    setSeconds(durations[MODE_KEYS[idx]] * 60);
  }
  function handleDurationChange(type, value) {
    const v = Math.max(1, Math.min(60, Number(value)));
    setDurations((d) => ({ ...d, [type]: v }));
    if (MODE_KEYS[mode] === type) {
      setSeconds(v * 60);
    }
  }

  // Progress (0-100)
  const total = durations[MODE_KEYS[mode]] * 60;
  const progress = 100 - Math.round((seconds / total) * 100);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3" preload="auto" />
      <div className="w-full max-w-md mx-4 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-100">Pomodoro Focus Timer</h1>
        {/* Mode Tabs */}
        <div className="flex gap-3 mb-8">
          {MODES.map((m, i) => (
            <button
              key={m.name}
              className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base transition
                ${mode === i ? `bg-gradient-to-br ${m.color} text-white shadow` : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
              onClick={() => handleModeChange(i)}
              disabled={isRunning}
            >
              {m.name}
            </button>
          ))}
        </div>
        {/* Timer Circle */}
        <div className="relative flex items-center justify-center h-[240px] mb-5">
          <svg width="240" height="240" className="absolute">
            <circle
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#374151"
              strokeWidth="18"
            />
            <circle
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="18"
              strokeDasharray={660}
              strokeDashoffset={660 - (660 * progress) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>
          <span className="relative text-5xl font-mono text-blue-300 drop-shadow-lg">{formatTime(seconds)}</span>
        </div>
        {/* Controls */}
        <div className="flex gap-4 mb-8">
          {isRunning ? (
            <button onClick={pauseTimer} className="px-6 py-2 rounded-xl bg-blue-700 text-white font-bold shadow hover:bg-blue-800 transition">Pause</button>
          ) : (
            <button onClick={startTimer} className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Start</button>
          )}
          <button onClick={resetTimer} className="px-6 py-2 rounded-xl bg-gray-700 text-gray-200 font-bold shadow hover:bg-gray-800 transition">Reset</button>
        </div>
        {/* Session Counter & Settings */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex-1 text-gray-300 text-lg">
            <span className="font-semibold text-gray-100">Pomodoros:</span> {sessionCount}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-400 text-sm">
              Focus
              <input type="number" min={1} max={60} value={durations.focus} onChange={e => handleDurationChange('focus', e.target.value)} className="w-14 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100" /> min
            </label>
            <label className="flex items-center gap-2 text-gray-400 text-sm">
              Break
              <input type="number" min={1} max={60} value={durations.break} onChange={e => handleDurationChange('break', e.target.value)} className="w-14 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100" /> min
            </label>
            <label className="flex items-center gap-2 text-gray-400 text-sm">
              Long Break
              <input type="number" min={1} max={60} value={durations.longBreak} onChange={e => handleDurationChange('longBreak', e.target.value)} className="w-14 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100" /> min
            </label>
          </div>
        </div>
        {/* Options */}
        <div className="flex gap-4 mb-8">
          <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
            <input type="checkbox" checked={autoSwitch} onChange={e => setAutoSwitch(e.target.checked)} className="accent-blue-600" />
            Auto-switch
          </label>
          <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
            <input type="checkbox" checked={soundOn} onChange={e => setSoundOn(e.target.checked)} className="accent-blue-600" />
            Sound
          </label>
        </div>
        {/* Motivational Quote */}
        <div className="w-full text-center text-blue-300 italic text-base mt-2">{quote}</div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Pomodoro Timer</footer>
    </div>
  );
}
