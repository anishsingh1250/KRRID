"use client";
import { useState } from "react";
import ChessboardUI from "./ChessboardUI";
import { Chess } from "chess.js";

// Example puzzles: each has a FEN and a solution move sequence (in SAN)
const PUZZLES = [
  {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4",
    solution: ["Bxf7+", "Kxf7", "Nxe5+"] // White to play and win material
  },
  {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3P4/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 2 4",
    solution: ["e4", "dxe4", "Ng5"] // White to play and attack f7
  },
  {
    fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/3P4/2P1PN2/PP1N1PPP/R1BQ1RK1 w - - 0 8",
    solution: ["dxe5", "Ng4", "h3"] // White to play and defend
  }
];

export default function ChessPuzzle() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [moveIdx, setMoveIdx] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const puzzle = PUZZLES[puzzleIdx];
  const chess = new Chess(puzzle.fen);
  // Play all correct moves so far
  for (let i = 0; i < moveIdx; i++) {
    chess.move(puzzle.solution[i]);
  }
  const fen = chess.fen();

  function handleMove(from: string, to: string, piece: string) {
    setStatus(null);
    const legalMoves = chess.moves({ verbose: true });
    const userMove = legalMoves.find(
      (m) => m.from === from && m.to === to && (!m.promotion || m.promotion === (piece === "p" ? "q" : undefined))
    );
    if (!userMove) {
      setStatus("Illegal move. Try again!");
      return false;
    }
    // Check if move matches the solution
    const correctMove = puzzle.solution[moveIdx];
    if (userMove.san === correctMove) {
      setMoveIdx(moveIdx + 1);
      if (moveIdx + 1 === puzzle.solution.length) {
        setStatus("Puzzle solved! 🎉");
      } else {
        setStatus("Correct! Next move...");
      }
      return true;
    } else {
      setStatus("Incorrect move. Try again!");
      return false;
    }
  }

  function handleNextPuzzle() {
    setPuzzleIdx((idx) => (idx + 1) % PUZZLES.length);
    setMoveIdx(0);
    setStatus(null);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-2 text-lg font-semibold text-primary">Puzzle {puzzleIdx + 1} of {PUZZLES.length}</div>
      <ChessboardUI
        fen={fen}
        makeMove={(fen, move) => {
          // move: {from, to, piece, ...}
          return handleMove(move.from, move.to, move.piece);
        }}
      />
      <div className="mt-4 text-base text-gray-700 min-h-[24px]">{status}</div>
      <button
        className="mt-2 px-4 py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
        onClick={handleNextPuzzle}
        disabled={moveIdx < puzzle.solution.length}
      >
        Next Puzzle
      </button>
    </div>
  );
} 