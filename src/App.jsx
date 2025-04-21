import React, { useState } from "react";

const unitTypes = {
  Length: {
    units: [
      { name: "Meters", value: "m", factor: 1 },
      { name: "Kilometers", value: "km", factor: 1000 },
      { name: "Centimeters", value: "cm", factor: 0.01 },
      { name: "Miles", value: "mi", factor: 1609.34 },
      { name: "Feet", value: "ft", factor: 0.3048 },
      { name: "Inches", value: "in", factor: 0.0254 },
    ],
  },
  Weight: {
    units: [
      { name: "Kilograms", value: "kg", factor: 1 },
      { name: "Grams", value: "g", factor: 0.001 },
      { name: "Pounds", value: "lb", factor: 0.453592 },
      { name: "Ounces", value: "oz", factor: 0.0283495 },
    ],
  },
  Temperature: {
    units: [
      { name: "Celsius", value: "C" },
      { name: "Fahrenheit", value: "F" },
      { name: "Kelvin", value: "K" },
    ],
  },
  Storage: {
    units: [
      { name: "Bytes", value: "B", factor: 1 },
      { name: "Kilobytes", value: "KB", factor: 1024 },
      { name: "Megabytes", value: "MB", factor: 1024 * 1024 },
      { name: "Gigabytes", value: "GB", factor: 1024 * 1024 * 1024 },
    ],
  },
};

function convertValue(type, value, from, to) {
  if (type === "Temperature") {
    // Special case for temperature
    if (from === to) return value;
    let celsius;
    if (from === "C") celsius = value;
    else if (from === "F") celsius = (value - 32) * (5 / 9);
    else if (from === "K") celsius = value - 273.15;
    let result;
    if (to === "C") result = celsius;
    else if (to === "F") result = celsius * (9 / 5) + 32;
    else if (to === "K") result = celsius + 273.15;
    return result;
  } else {
    // All other types use factor
    const fromUnit = unitTypes[type].units.find((u) => u.value === from);
    const toUnit = unitTypes[type].units.find((u) => u.value === to);
    if (!fromUnit || !toUnit) return 0;
    return (value * fromUnit.factor) / toUnit.factor;
  }
}

function App() {
  const [type, setType] = useState("Length");
  const [from, setFrom] = useState(unitTypes["Length"].units[0].value);
  const [to, setTo] = useState(unitTypes["Length"].units[1].value);
  const [input, setInput] = useState(1);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFrom(unitTypes[e.target.value].units[0].value);
    setTo(unitTypes[e.target.value].units[1].value);
    setInput(1);
  };

  const result = convertValue(type, Number(input), from, to);
  const toUnit = unitTypes[type].units.find((u) => u.value === to);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <div className="w-full max-w-3xl mx-4 md:mx-auto bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 md:p-16 flex flex-col items-center glass-card">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center text-white drop-shadow-lg">Online Unit Converter</h1>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-lg md:text-2xl font-semibold text-white">Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full border-none rounded-xl px-5 py-4 text-xl md:text-2xl bg-white/40 backdrop-blur-md focus:ring-2 focus:ring-purple-400 outline-none"
          >
            {Object.keys(unitTypes).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
          <div className="flex-1">
            <label className="block mb-2 text-lg md:text-2xl font-semibold text-white">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border-none rounded-xl px-5 py-4 text-xl md:text-2xl bg-white/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              {unitTypes[type].units.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-lg md:text-2xl font-semibold text-white">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border-none rounded-xl px-5 py-4 text-xl md:text-2xl bg-white/40 backdrop-blur-md focus:ring-2 focus:ring-pink-400 outline-none"
            >
              {unitTypes[type].units.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-lg md:text-2xl font-semibold text-white">Value</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border-none rounded-xl px-5 py-4 text-xl md:text-2xl bg-white/40 backdrop-blur-md focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div className="mb-8 text-center w-full">
          <span className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">Result: </span>
          <span className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">{Number.isFinite(result) && toUnit ? `${result} ${toUnit.value}` : "-"}</span>
        </div>
        <div className="text-xs text-white/70 text-center mt-6 w-full">
          {/* Placeholder for ads or affiliate links */}
          <span>Ad space</span>
        </div>
      </div>
      <footer className="mt-10 text-white/70 text-sm md:text-base">&copy; {new Date().getFullYear()} Unit Converter</footer>
    </div>
  );
}

export default App;
