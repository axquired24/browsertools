import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FLEX_DIRECTIONS = ["row", "row-reverse", "column", "column-reverse"];
const FLEX_WRAP = ["nowrap", "wrap", "wrap-reverse"];
const JUSTIFY = ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"];
const ALIGN_ITEMS = ["stretch", "flex-start", "center", "flex-end", "baseline"];
const ALIGN_CONTENT = ["stretch", "flex-start", "center", "flex-end", "space-between", "space-around"];

const COLORS = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-pink-500", "bg-yellow-500", "bg-gray-400", "bg-red-500"];

export default function FlexGenerator() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, content: "Item 1", color: COLORS[0], grow: 1, shrink: 1, basis: "auto", padding: "p-4", rounded: "rounded-lg" },
    { id: 2, content: "Item 2", color: COLORS[1], grow: 1, shrink: 1, basis: "auto", padding: "p-4", rounded: "rounded-lg" },
  ]);
  const [container, setContainer] = useState({
    direction: "row",
    wrap: "wrap",
    justify: "flex-start",
    alignItems: "stretch",
    alignContent: "stretch",
    gap: 4,
    bg: "bg-gray-800/60"
  });
  const [selected, setSelected] = useState(null);

  function addItem() {
    setItems([
      ...items,
      {
        id: Date.now(),
        content: `Item ${items.length + 1}`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        grow: 1,
        shrink: 1,
        basis: "auto",
        padding: "p-4",
        rounded: "rounded-lg"
      },
    ]);
  }
  function removeItem(id) {
    setItems(items.filter(i => i.id !== id));
    setSelected(null);
  }
  function updateItem(id, updates) {
    setItems(items.map(i => (i.id === id ? { ...i, ...updates } : i)));
  }
  function moveItem(from, to) {
    if (from === to) return;
    const arr = [...items];
    const [removed] = arr.splice(from, 1);
    arr.splice(to, 0, removed);
    setItems(arr);
  }
  function exportCode() {
    const containerClass = `flex flex-${container.direction} flex-${container.wrap} justify-${container.justify.replace('flex-', '')} items-${container.alignItems.replace('flex-', '')} content-${container.alignContent.replace('flex-', '')} gap-${container.gap} ${container.bg}`;
    const code = `<div class=\"${containerClass}\">\n` +
      items.map(i => `  <div class=\"${i.color} ${i.padding} ${i.rounded} flex-grow-${i.grow} flex-shrink-${i.shrink} flex-basis-${i.basis}\">${i.content}</div>`).join("\n") +
      `\n</div>`;
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <button onClick={() => navigate("/")} className="absolute left-4 top-4 md:left-10 md:top-10 px-5 py-2 rounded-full bg-gray-800/70 text-blue-200 font-semibold shadow hover:bg-blue-900 transition z-10">← Back</button>
      <div className="w-full max-w-6xl mx-0 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-200">Flex Generator</h1>
        {/* Controls on top, full width */}
        <div className="w-full flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={addItem} className="px-4 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 transition">+ Add Item</button>
            <button onClick={exportCode} className="px-4 py-1 rounded bg-green-700 text-white font-bold hover:bg-green-800 transition">Export Code</button>
            <label className="text-gray-300 font-semibold ml-4">Direction:
              <select value={container.direction} onChange={e => setContainer(c => ({ ...c, direction: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {FLEX_DIRECTIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="text-gray-300 font-semibold ml-4">Wrap:
              <select value={container.wrap} onChange={e => setContainer(c => ({ ...c, wrap: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {FLEX_WRAP.map(w => <option key={w}>{w}</option>)}
              </select>
            </label>
            <label className="text-gray-300 font-semibold ml-4">Justify:
              <select value={container.justify} onChange={e => setContainer(c => ({ ...c, justify: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {JUSTIFY.map(j => <option key={j}>{j}</option>)}
              </select>
            </label>
            <label className="text-gray-300 font-semibold ml-4">Align Items:
              <select value={container.alignItems} onChange={e => setContainer(c => ({ ...c, alignItems: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {ALIGN_ITEMS.map(a => <option key={a}>{a}</option>)}
              </select>
            </label>
            <label className="text-gray-300 font-semibold ml-4">Align Content:
              <select value={container.alignContent} onChange={e => setContainer(c => ({ ...c, alignContent: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {ALIGN_CONTENT.map(a => <option key={a}>{a}</option>)}
              </select>
            </label>
            <label className="text-gray-300 font-semibold ml-4">Gap:
              <input type="number" min={0} max={16} value={container.gap} onChange={e => setContainer(c => ({ ...c, gap: Number(e.target.value) }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white w-16" />
            </label>
            <label className="text-gray-300 font-semibold ml-4">Container BG:
              <select value={container.bg} onChange={e => setContainer(c => ({ ...c, bg: e.target.value }))} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                {["bg-gray-800/60", "bg-white/10", "bg-blue-100/20", "bg-purple-100/20", "bg-green-100/20"].map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          {/* Item options */}
          {selected && (
            <div className="mt-4 p-4 rounded-xl bg-gray-800/80 border border-gray-700 w-full max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-4 items-center">
                <label className="text-gray-300 font-semibold">Content:
                  <input value={selected.content} onChange={e => updateItem(selected.id, { content: e.target.value })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white w-32" />
                </label>
                <label className="text-gray-300 font-semibold">Color:
                  <select value={selected.color} onChange={e => updateItem(selected.id, { color: e.target.value })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                    {COLORS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="text-gray-300 font-semibold">Padding:
                  <select value={selected.padding} onChange={e => updateItem(selected.id, { padding: e.target.value })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                    {["p-1","p-2","p-4","p-6","p-8"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="text-gray-300 font-semibold">Rounded:
                  <select value={selected.rounded} onChange={e => updateItem(selected.id, { rounded: e.target.value })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white">
                    {["rounded-none","rounded","rounded-lg","rounded-xl","rounded-full"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <label className="text-gray-300 font-semibold">Grow:
                  <input type="number" min={0} max={5} value={selected.grow} onChange={e => updateItem(selected.id, { grow: Number(e.target.value) })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white w-12" />
                </label>
                <label className="text-gray-300 font-semibold">Shrink:
                  <input type="number" min={0} max={5} value={selected.shrink} onChange={e => updateItem(selected.id, { shrink: Number(e.target.value) })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white w-12" />
                </label>
                <label className="text-gray-300 font-semibold">Basis:
                  <input value={selected.basis} onChange={e => updateItem(selected.id, { basis: e.target.value })} className="ml-2 rounded px-2 py-1 bg-gray-900 text-white w-16" placeholder="auto/0/50%/etc" />
                </label>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => moveItem(items.findIndex(i => i.id === selected.id), Math.max(0, items.findIndex(i => i.id === selected.id) - 1))} className="px-2 py-1 rounded bg-gray-700 text-white font-bold hover:bg-gray-800 transition">↑</button>
                  <button onClick={() => moveItem(items.findIndex(i => i.id === selected.id), Math.min(items.length-1, items.findIndex(i => i.id === selected.id) + 1))} className="px-2 py-1 rounded bg-gray-700 text-white font-bold hover:bg-gray-800 transition">↓</button>
                  <button onClick={() => removeItem(selected.id)} className="px-2 py-1 rounded bg-red-700 text-white font-bold hover:bg-red-800 transition">Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Live Preview full width at the bottom */}
        <div className="w-full flex flex-col items-center">
          <div className={`w-full h-[420px] min-h-[420px] ${container.bg} border-2 border-blue-400 flex flex-${container.direction} flex-${container.wrap} justify-${container.justify.replace('flex-', '')} items-${container.alignItems.replace('flex-', '')} content-${container.alignContent.replace('flex-', '')} gap-${container.gap} rounded-xl p-8 mb-4 transition-all duration-300`}
            style={{ minHeight: 420, height: 420, maxHeight: 420, overflow: 'auto' }}>
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`${item.color} ${item.padding} ${item.rounded} flex-grow-${item.grow} flex-shrink-${item.shrink} flex-basis-${item.basis} flex items-center justify-center text-white text-lg font-bold shadow cursor-pointer transition-all duration-200 ${selected && selected.id === item.id ? 'ring-4 ring-blue-400' : ''}`}
                style={{ flexGrow: item.grow, flexShrink: item.shrink, flexBasis: item.basis, minWidth: 40, minHeight: 40 }}
                onClick={() => setSelected(item)}
                tabIndex={0}
              >
                {item.content}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center mt-2 w-full">(Reorder, edit, or remove items. Export or copy your layout!)</div>
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Flex Generator</footer>
    </div>
  );
}
