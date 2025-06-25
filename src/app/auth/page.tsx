
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight, FaPlay, FaSearch, FaChevronDown, FaChevronRight as FaChevronRightIcon } from "react-icons/fa";

// Minimal chessboard (no AI, no move history, no analysis)
const Chessboard = dynamic(() => import("@/components/ChessboardUI"), { ssr: false });

// Mock course data (structure matches Google Sheet template)
const courseTree = [
  {
    chapter: "I. Beginner",
    topics: [
      {
        topic: "Beginner_CW",
        positions: [
          {
            title: "1. CW-Nature of Game - Position-1",
            fen: "8/8/8/8/8/8/8/Kk6 w - - 0 1",
            pgn: "1. Kd6 Ke6",
            description: "Learn the nature of the game."
          },
          {
            title: "2. CW-Nature of Game - Position-2",
            fen: "8/8/8/8/8/8/8/KQ6 w - - 0 1",
            pgn: "1. Qc2 Qf2",
            description: "Practice with the Queen."
          }
        ]
      },
      {
        topic: "Beginner_HW",
        positions: [
          {
            title: "HW 1 - Practice Puzzles",
            fen: "8/8/8/8/8/8/8/Kk6 w - - 0 1",
            pgn: "1. Kd6 Ke6",
            description: "Homework practice."
          }
        ]
      }
    ]
  }
];

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [openChapter, setOpenChapter] = useState<number | null>(0);
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [selectedPosition, setSelectedPosition] = useState<{ chap: number; topic: number; pos: number }>({ chap: 0, topic: 0, pos: 0 });

  // Find the current position
  const currentPosition = courseTree[selectedPosition.chap]?.topics[selectedPosition.topic]?.positions[selectedPosition.pos];

  // Navigation controls for positions
  const positionsFlat = courseTree.flatMap((chap, chapIdx) =>
    chap.topics.flatMap((topic, topicIdx) =>
      topic.positions.map((p, posIdx) => ({ chap: chapIdx, topic: topicIdx, pos: posIdx, ...p }))
    )
  ).filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const currentFlatIdx = positionsFlat.findIndex(p => p.chap === selectedPosition.chap && p.topic === selectedPosition.topic && p.pos === selectedPosition.pos);
  const goPrev = () => {
    if (currentFlatIdx > 0) setSelectedPosition({ chap: positionsFlat[currentFlatIdx - 1].chap, topic: positionsFlat[currentFlatIdx - 1].topic, pos: positionsFlat[currentFlatIdx - 1].pos });
  };
  const goNext = () => {
    if (currentFlatIdx < positionsFlat.length - 1) setSelectedPosition({ chap: positionsFlat[currentFlatIdx + 1].chap, topic: positionsFlat[currentFlatIdx + 1].topic, pos: positionsFlat[currentFlatIdx + 1].pos });
  };
  const goPlay = () => {};

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-row">
      {/* Left: Minimal chessboard and controls */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-lg aspect-square bg-white rounded-xl shadow-lg flex items-center justify-center mb-4">
          <Chessboard fen={currentPosition?.fen === "start" ? undefined : currentPosition?.fen} boardWidth={420} />
        </div>
        <div className="flex gap-4 mt-2">
          <button onClick={goPrev} className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-3 text-xl"><FaChevronLeft /></button>
          <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 text-xl"><FaPlay /></button>
          <button onClick={goNext} className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-3 text-xl"><FaChevronRight /></button>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow p-4 w-full max-w-lg">
          <h2 className="font-heading text-xl font-bold mb-2 text-[#181f2b]">{currentPosition?.title}</h2>
          <p className="text-gray-700 mb-2">{currentPosition?.description}</p>
          <div className="bg-gray-100 rounded p-2 text-xs font-mono mb-2 text-[#181f2b]">PGN: {currentPosition?.pgn}</div>
        </div>
      </div>
      {/* Right: Multi-level collapsible course tree with positions */}
      <div className="w-[400px] bg-white border-l border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => { setSearch(e.target.value); setSelectedPosition({ chap: 0, topic: 0, pos: 0 }); }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {courseTree.map((chap, chapIdx) => (
            <div key={chapIdx}>
              <button
                className="flex items-center w-full font-heading font-bold text-lg mb-2 px-2 py-2 rounded hover:bg-primary/10 text-[#181f2b]"
                onClick={() => setOpenChapter(openChapter === chapIdx ? null : chapIdx)}
              >
                {openChapter === chapIdx ? <FaChevronDown className="mr-2" /> : <FaChevronRightIcon className="mr-2" />}
                {chap.chapter}
              </button>
              {openChapter === chapIdx && (
                <div className="ml-4">
                  {chap.topics.map((topic, topicIdx) => (
                    <div key={topicIdx}>
                      <button
                        className="flex items-center w-full font-heading font-semibold text-base mb-2 px-2 py-2 rounded hover:bg-primary/10 text-[#181f2b]"
                        onClick={() => setOpenTopic(openTopic === topicIdx ? null : topicIdx)}
                      >
                        {openTopic === topicIdx ? <FaChevronDown className="mr-2" /> : <FaChevronRightIcon className="mr-2" />}
                        {topic.topic}
                      </button>
                      {openTopic === topicIdx && (
                        <ul>
                          {topic.positions.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((p, posIdx) => (
                            <li key={posIdx} className="mb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-16 h-16 bg-gray-100 rounded shadow flex items-center justify-center">
                                  <Chessboard fen={p.fen === "start" ? undefined : p.fen} boardWidth={64} />
                                </div>
                                <div className="flex-1">
                                  <div className="font-heading text-sm font-bold text-[#181f2b]">{p.title}</div>
                                  <div className="text-xs text-gray-500">{p.description}</div>
                                </div>
                              </div>
                              <div className="flex gap-2 items-center mb-1">
                                <button onClick={() => setSelectedPosition({ chap: chapIdx, topic: topicIdx, pos: posIdx })} className="bg-[#7c3aed] text-white rounded px-3 py-1 text-xs font-heading font-semibold hover:bg-primary transition">Load game</button>
                                <span className="bg-gray-200 rounded px-2 py-1 text-xs font-mono text-[#181f2b]">PGN: {p.pgn}</span>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => setSelectedPosition({ chap: chapIdx, topic: topicIdx, pos: Math.max(0, posIdx - 1) })} className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-1 text-xs"><FaChevronLeft /></button>
                                <button onClick={() => setSelectedPosition({ chap: chapIdx, topic: topicIdx, pos: Math.min(topic.positions.length - 1, posIdx + 1) })} className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-1 text-xs"><FaChevronRight /></button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 