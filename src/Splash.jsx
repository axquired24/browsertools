import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  { name: "Unit Converter", path: "/unit-converter", desc: "Convert between units instantly." },
  { name: "Password Generator", path: "/password-generator", desc: "Create strong passwords and check their strength." },
  { name: "Text Analysis", path: "/text-analysis", desc: "Analyze your text for stats and keyword frequency." },
  { name: "Pomodoro Timer", path: "/pomodoro", desc: "Focus with the Pomodoro technique and stay productive." },
  { name: "Flex Generator", path: "/flex-generator", desc: "Visually build and customize advanced flex layouts with live preview and code export." },
];

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <div className="w-full max-w-2xl mx-4 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-10 md:p-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-300 drop-shadow-lg">Productivity Toolbox</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {tools.map(tool => (
            <button
              key={tool.path}
              onClick={() => navigate(tool.path)}
              className="flex flex-col items-start p-6 bg-gradient-to-br from-blue-800 via-gray-900 to-purple-900 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200 border border-blue-900 text-left"
            >
              <span className="text-2xl md:text-3xl font-bold text-blue-200 mb-2">{tool.name}</span>
              <span className="text-gray-300 text-base">{tool.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Productivity Toolbox</footer>
    </div>
  );
}
