import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-pink-500", "bg-yellow-500", "bg-gray-400", "bg-red-500"
];
const JUSTIFY = ["justify-start", "justify-center", "justify-end"];
const ITEMS = ["items-start", "items-center", "items-end"];

// Reorder helper
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function GridBento() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([
    { id: 1, content: "Block 1", bg: "bg-blue-500", rowSpan: 1, colSpan: 1, justify: JUSTIFY[1], items: ITEMS[1] },
    { id: 2, content: "Block 2", bg: "bg-purple-500", rowSpan: 1, colSpan: 1, justify: JUSTIFY[1], items: ITEMS[1] },
  ]);
  const [cols, setCols] = useState(2);
  const [selected, setSelected] = useState(null);

  function addBlock() {
    setBlocks([
      ...blocks,
      {
        id: Date.now(),
        content: `Block ${blocks.length + 1}`,
        bg: COLORS[Math.floor(Math.random() * COLORS.length)],
        rowSpan: 1,
        colSpan: 1,
        justify: JUSTIFY[1],
        items: ITEMS[1],
      },
    ]);
  }
  function removeBlock(id) {
    setBlocks(blocks.filter(b => b.id !== id));
    setSelected(null);
  }
  function updateBlock(id, updates) {
    setBlocks(blocks.map(b => (b.id === id ? { ...b, ...updates } : b)));
  }
  function onDragEnd(result) {
    if (!result.destination) return;
    const newBlocks = reorder(blocks, result.source.index, result.destination.index);
    setBlocks(newBlocks);
  }

  function exportCode() {
    const code = `<div class=\"grid grid-cols-${cols} gap-4\">\n` +
      blocks.map(b => `  <div class=\"${b.bg} rounded-lg p-4 col-span-${b.colSpan} row-span-${b.rowSpan} flex ${b.justify} ${b.items}\">${b.content}</div>`).join("\n") +
      `\n</div>`;
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  }

  // Styles for DnD
  const grid = 8;
  const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    ...draggableStyle
  });
  const getListStyle = isDraggingOver => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '1rem',
    background: isDraggingOver ? '#374151' : 'rgba(31,41,55,0.6)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    minHeight: 320,
    marginBottom: '1rem',
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <button onClick={() => navigate("/")} className="absolute left-4 top-4 md:left-10 md:top-10 px-5 py-2 rounded-full bg-gray-800/70 text-blue-200 font-semibold shadow hover:bg-blue-900 transition z-10">← Back</button>
      <div className="w-full max-w-6xl mx-0 md:mx-auto bg-gray-900/80 border border-gray-800 shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-200">Bento Grid Generator</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full mb-8">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-4 max-w-xs">
            <div>
              <label className="text-gray-300 font-semibold mr-2">Columns:</label>
              <select value={cols} onChange={e => setCols(Number(e.target.value))} className="rounded px-2 py-1 bg-gray-800 text-blue-200">
                {[2,3,4].map(n => <option key={n}>{n}</option>)}
              </select>
              <button onClick={addBlock} className="ml-4 px-4 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 transition">+ Add Block</button>
              <button onClick={exportCode} className="ml-2 px-4 py-1 rounded bg-green-700 text-white font-bold hover:bg-green-800 transition">Export Code</button>
            </div>
            {selected && (
              <div className="mt-4 p-4 rounded-xl bg-gray-800/80 border border-gray-700">
                <div className="mb-2">
                  <label className="text-gray-300 mr-2">Content:</label>
                  <input value={selected.content} onChange={e => updateBlock(selected.id, { content: e.target.value })} className="rounded px-2 py-1 bg-gray-900 text-white w-32" />
                </div>
                <div className="mb-2">
                  <label className="text-gray-300 mr-2">Color:</label>
                  <select value={selected.bg} onChange={e => updateBlock(selected.id, { bg: e.target.value })} className="rounded px-2 py-1 bg-gray-900 text-white">
                    {COLORS.map(c => <option key={c} value={c}>{c.replace('bg-','')}</option>)}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="text-gray-300 mr-2">Row Span:</label>
                  <select value={selected.rowSpan} onChange={e => updateBlock(selected.id, { rowSpan: Number(e.target.value) })} className="rounded px-2 py-1 bg-gray-900 text-white">
                    {[1,2,3].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <label className="text-gray-300 ml-4 mr-2">Col Span:</label>
                  <select value={selected.colSpan} onChange={e => updateBlock(selected.id, { colSpan: Number(e.target.value) })} className="rounded px-2 py-1 bg-gray-900 text-white">
                    {[1,2,3].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="text-gray-300 mr-2">Horizontal Align:</label>
                  <select value={selected.justify} onChange={e => updateBlock(selected.id, { justify: e.target.value })} className="rounded px-2 py-1 bg-gray-900 text-white">
                    {JUSTIFY.map(j => <option key={j} value={j}>{j.replace('justify-','')}</option>)}
                  </select>
                  <label className="text-gray-300 ml-4 mr-2">Vertical Align:</label>
                  <select value={selected.items} onChange={e => updateBlock(selected.id, { items: e.target.value })} className="rounded px-2 py-1 bg-gray-900 text-white">
                    {ITEMS.map(i => <option key={i} value={i}>{i.replace('items-','')}</option>)}
                  </select>
                </div>
                <button onClick={() => removeBlock(selected.id)} className="mt-2 px-4 py-1 rounded bg-red-700 text-white font-bold hover:bg-red-800 transition">Remove</button>
              </div>
            )}
          </div>
          {/* Live Preview */}
          <div className="flex-[3] flex flex-col items-center w-full">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="bento-grid" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {blocks.map((block, idx) => (
                      <Draggable key={block.id.toString()} draggableId={block.id.toString()} index={idx}>
                        {(provided, snapshot) => (
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              style={{
                                ...getItemStyle(provided.draggableProps.style, snapshot.isDragging),
                                gridColumn: `span ${block.colSpan} / span ${block.colSpan}`,
                                gridRow: `span ${block.rowSpan} / span ${block.rowSpan}`,
                              }}
                              className={`flex ${block.justify} ${block.items} items-center justify-center rounded-xl text-white text-lg font-bold shadow cursor-move ${block.bg} ${selected && selected.id === block.id ? 'ring-4 ring-blue-400' : ''} ${snapshot.isDragging ? 'scale-105 z-20' : ''}`}
                              onClick={() => setSelected(block)}
                              tabIndex={0}
                            >
                              {block.content}
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="text-xs text-gray-400 text-center mt-2 w-full">(Drag, resize, align, edit, or remove blocks. Export or copy your layout!)</div>
          </div>
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm md:text-base">&copy; {new Date().getFullYear()} Bento Grid Generator</footer>
    </div>
  );
}
