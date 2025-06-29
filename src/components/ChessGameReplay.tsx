"use client";
import { useState } from "react";
import ChessboardUI from "./ChessboardUI";
import { Chess } from "chess.js";

// Example PGN: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6
const MOVES = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"];

export default function ChessGameReplay() {
  const [moveIndex, setMoveIndex] = useState(0);
  const chess = new Chess();
  // Play moves up to moveIndex
  chess.reset();
  for (let i = 0; i < moveIndex; i++) {
    chess.move(MOVES[i]);
  }
  const fen = chess.fen();

  const handlePrev = () => setMoveIndex((idx) => Math.max(0, idx - 1));
  const handleNext = () => setMoveIndex((idx) => Math.min(MOVES.length, idx + 1));

  return (
    <div className="flex flex-col items-center w-full">
      <ChessboardUI fen={fen} />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={moveIndex === 0}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-mono text-lg">Move {moveIndex} / {MOVES.length}</span>
        <button
          onClick={handleNext}
          disabled={moveIndex === MOVES.length}
          className="px-4 py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-2 text-gray-600 text-base">
        {moveIndex > 0 ? `Last move: ${MOVES[moveIndex-1]}` : "Start position"}
      </div>
    </div>
  );
} 