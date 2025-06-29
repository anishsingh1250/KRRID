"use client";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { supabaseAdmin as supabase } from "@/utils/supabaseClient";
import ChessboardUI from "./ChessboardUI";

interface Chapter {
  id: string;
  title: string;
  position: number;
  difficulty: string;
}

interface Lesson {
  id: string;
  title: string;
  chapter: string;
  position: number;
  pgn?: string;
  fen?: string;
}

interface Position {
  id: string;
  label: string;
  description: string;
  lesson: string;
  position: number;
  fen?: string;
  pgn?: string;
}

export default function AdminTeachingPlatform() {
  // State for chapters, lessons, positions
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [search, setSearch] = useState("");

  // Chessboard state
  const [fen, setFen] = useState("start");
  const [pgn, setPgn] = useState("");
  const [moveIdx, setMoveIdx] = useState(0);
  const [moves, setMoves] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  // Fetch chapters/lessons/positions
  useEffect(() => {
    fetchChapters();
  }, []);
  async function fetchChapters() {
    const { data } = await supabase.from("chapters").select("*").order("position");
    setChapters(data || []);
  }
  async function fetchLessons(chapterId: string) {
    const { data } = await supabase.from("lessons").select("*").eq("chapter", chapterId).order("position");
    setLessons(data || []);
  }
  async function fetchPositions(lessonId: string) {
    const { data } = await supabase.from("positions").select("*").eq("lesson", lessonId).order("position");
    setPositions(data || []);
  }

  // Handlers for selecting tree items
  function handleSelectChapter(ch: Chapter) {
    setSelectedChapter(ch);
    setSelectedLesson(null);
    setSelectedPosition(null);
    fetchLessons(ch.id);
  }
  function handleSelectLesson(ls: Lesson) {
    setSelectedLesson(ls);
    setSelectedPosition(null);
    fetchPositions(ls.id);
  }
  function handleSelectPosition(pos: Position) {
    setSelectedPosition(pos);
    setFen(pos.fen || "start");
    setPgn(pos.pgn || "");
    setMoveIdx(0);
    setMoves(pos.pgn ? pos.pgn.split(/\s+/).filter((m: string) => m && !/\d+\./.test(m)) : []);
    setStatus("");
  }

  // Chessboard controls
  function handleMoveNav(type: string) {
    if (!moves.length) return;
    let idx = moveIdx;
    if (type === "first") idx = 0;
    if (type === "prev") idx = Math.max(0, moveIdx - 1);
    if (type === "next") idx = Math.min(moves.length, moveIdx + 1);
    if (type === "last") idx = moves.length;
    setMoveIdx(idx);
    const chess = new Chess(selectedPosition?.fen || "start");
    for (let i = 0; i < idx; i++) chess.move(moves[i]);
    setFen(chess.fen());
  }
  function handlePastePGN(pgnText: string) {
    setPgn(pgnText);
    setMoves(pgnText.split(/\s+/).filter(m => m && !/\d+\./.test(m)));
    setMoveIdx(0);
    setStatus("PGN loaded");
  }
  function handleCopyPGN() {
    navigator.clipboard.writeText(pgn);
    setStatus("PGN copied");
  }
  function handleSetupPosition(newFen: string) {
    setFen(newFen);
    setStatus("Position set");
  }
  function handleUndo() {
    if (moveIdx > 0) handleMoveNav("prev");
  }
  function handleSave() {
    // Save the current FEN/PGN to the selected position
    if (!selectedPosition) return;
    supabase.from("positions").update({ fen, pgn }).eq("id", selectedPosition.id);
    setStatus("Saved");
  }
  function handleNew() {
    setFen("start");
    setPgn("");
    setMoves([]);
    setMoveIdx(0);
    setStatus("New position");
  }

  // Filtered tree for search
  const filteredChapters = chapters.filter(ch => ch.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex w-full min-h-screen bg-[#f7f9fb]">
      {/* Chessboard and controls */}
      <div className="flex-1 flex flex-col items-center justify-start p-8">
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <ChessboardUI fen={fen} />
        </div>
        <div className="flex gap-2 mb-4">
          <button onClick={() => handleMoveNav("first")}>{"|<"}</button>
          <button onClick={() => handleMoveNav("prev")}>{"<"}</button>
          <button onClick={() => handleMoveNav("next")}>{">"}</button>
          <button onClick={() => handleMoveNav("last")}>{">|"}</button>
        </div>
        <div className="flex gap-2 mb-4">
          <button onClick={handleSave} className="bg-purple-600 text-white px-3 py-1 rounded">Save</button>
          <button onClick={handleNew}>New</button>
          <button onClick={() => handleSetupPosition(prompt("Enter FEN:", fen) || fen)}>Setup Position</button>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={() => handlePastePGN(prompt("Paste PGN:", pgn) || pgn)}>Paste PGN game</button>
          <button onClick={handleCopyPGN}>Copy PGN</button>
        </div>
        {status && <div className="text-green-600 mb-2">{status}</div>}
        {selectedPosition && (
          <div className="bg-white rounded shadow p-4 w-full max-w-xl">
            <div className="font-bold mb-2">{selectedPosition.label}</div>
            <div className="text-xs text-gray-500 mb-2">FEN: {fen}</div>
            <div className="text-xs text-gray-500 mb-2">PGN: {pgn}</div>
            <div className="text-sm text-gray-700">{selectedPosition.description}</div>
          </div>
        )}
      </div>
      {/* Sidebar: course/lesson tree */}
      <div className="w-[400px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-4">
          {filteredChapters.map(ch => (
            <div key={ch.id} className="mb-2">
              <div className="font-bold cursor-pointer" onClick={() => handleSelectChapter(ch)}>{ch.title}</div>
              {selectedChapter?.id === ch.id && lessons.length > 0 && (
                <div className="ml-4">
                  {lessons.map(ls => (
                    <div key={ls.id} className="mb-1">
                      <div className="font-semibold cursor-pointer" onClick={() => handleSelectLesson(ls)}>{ls.title}</div>
                      {selectedLesson?.id === ls.id && positions.length > 0 && (
                        <div className="ml-4">
                          {positions.map(pos => (
                            <div key={pos.id} className="cursor-pointer text-sm mb-1" onClick={() => handleSelectPosition(pos)}>
                              {pos.label}
                            </div>
                          ))}
                        </div>
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