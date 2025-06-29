"use client";
import { useState } from "react";
import ChessboardUI from "@/components/ChessboardUI";
import { useChessGame } from "@/hooks/useChessGame";

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export default function PlayChessPage() {
  const { gameState, makeMove, reset, goToPrevious, goToNext } = useChessGame();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');

  function handleMove(fen: string, move: Move) {
    // move.from and move.to are available
    makeMove(move.from, move.to, move.promotion);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center">
          <ChessboardUI
            fen={gameState.position}
            makeMove={handleMove}
            boardOrientation={orientation}
            boardWidth={420}
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 transition-all"
            >
              New Game
            </button>
            <button
              onClick={() => setOrientation(o => (o === 'white' ? 'black' : 'white'))}
              className="px-4 py-2 rounded-lg bg-gray-700 text-sky-200 font-bold shadow hover:bg-gray-900 transition-all"
            >
              Flip Board
            </button>
            <button
              onClick={goToPrevious}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
            >
              Undo
            </button>
            <button
              onClick={goToNext}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
            >
              Redo
            </button>
          </div>
        </div>
        <div className="max-w-md mt-8 md:mt-0 text-white">
          <h2 className="text-2xl font-bold mb-4 text-sky-400">How to Play</h2>
          <ul className="list-disc pl-6 text-lg text-gray-200 space-y-2">
            <li>Drag or click pieces to move.</li>
            <li>Use the controls to start a new game, flip the board, or undo/redo moves.</li>
            <li>More features (AI, multiplayer, analysis) coming soon!</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 