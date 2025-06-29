"use client";
import { useState } from "react";
import ChessboardUI from "./ChessboardUI";
import { Chess } from "chess.js";

const GAMES = [
  {
    title: "Kasparov vs. Topalov, 1999",
    players: "Garry Kasparov vs. Veselin Topalov",
    year: 1999,
    moves: [
      "e4", "d6", "d4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "Qd2", "c6", "f3", "b5", "Nge2", "Nbd7", "Bh6", "Bxh6", "Qxh6", "Bb7", "a3", "e5", "O-O-O", "Qe7", "Kb1", "a6", "Nc1", "O-O-O", "Nb3", "exd4", "Rxd4", "c5", "Rd1", "Nb6", "g3", "Kb8", "Na5", "Ba8", "Bh3", "d5", "Qf4+", "Ka7", "Rhe1", "d4", "Nd5", "Nfxd5", "exd5", "Qd6", "Re7+", "Kb6", "Rxd4", "cxd4", "Qxd4+", "Kxa5", "b4+", "Ka4", "Qxc3", "Qxd5", "Ra8", "Qb2#"
    ]
  },
  {
    title: "Fischer vs. Byrne, 1956 (The Game of the Century)",
    players: "Bobby Fischer vs. Donald Byrne",
    year: 1956,
    moves: [
      "Nf3", "Nf6", "c4", "g6", "Nc3", "Bg7", "d4", "O-O", "Bf4", "d5", "Qb3", "dxc4", "Qxc4", "c6", "e4", "Nbd7", "Rd1", "Nb6", "Qc5", "Bg4", "Bg5", "Na4", "Qa3", "Nxc3", "bxc3", "Nxe4", "Bxe7", "Qb6", "Bc4", "Nxc3", "Bc5", "Rfe8+", "Kf1", "Be6", "Bxb6", "Bxc4+", "Kg1", "Ne2+", "Kf1", "Nxd4+", "Kg1", "Ne2+", "Kf1", "Nc3+", "Kg1", "axb6", "Qb4", "Ra4", "Qxb6", "Nxd1", "h3", "Rxa2", "Kh2", "Nxf2", "Re1", "Rxe1", "Qd8+", "Bf8", "Nxe1", "Bd5", "Nf3", "Ne4", "Qb8", "b5", "Ne5", "Kg7", "Nd7", "Bd6+", "Kg1", "Ra1#"
    ]
  },
  {
    title: "Morphy vs. Duke Karl, 1858 (The Opera Game)",
    players: "Paul Morphy vs. Duke Karl/Count Isouard",
    year: 1858,
    moves: [
      "e4", "e5", "Nf3", "d6", "d4", "Bg4", "dxe5", "Bxf3", "Qxf3", "dxe5", "Bc4", "Nf6", "Qb3", "Qe7", "Nc3", "c6", "Bg5", "b5", "Nxb5", "cxb5", "Bxb5+", "Nbd7", "O-O-O", "Rd8", "Rxd7", "Rxd7", "Rd1", "Qe6", "Bxd7+", "Nxd7", "Qb8+", "Nxb8", "Rd8#"
    ]
  }
];

export default function MasterGames() {
  const [selected, setSelected] = useState(0);
  const [moveIdx, setMoveIdx] = useState(0);
  const game = GAMES[selected];
  const chess = new Chess();
  chess.reset();
  for (let i = 0; i < moveIdx; i++) {
    chess.move(game.moves[i]);
  }
  const fen = chess.fen();

  const handlePrev = () => setMoveIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setMoveIdx((idx) => Math.min(game.moves.length, idx + 1));
  const handleSelect = (idx: number) => {
    setSelected(idx);
    setMoveIdx(0);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full items-start">
      {/* Game List */}
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <div className="font-heading text-xl mb-2 text-primary">Famous Games</div>
        {GAMES.map((g, idx) => (
          <button
            key={g.title}
            onClick={() => handleSelect(idx)}
            className={`text-left px-4 py-2 rounded-lg border transition-all font-semibold ${selected === idx ? "bg-primary text-white border-primary scale-105" : "bg-gray-100 text-black border-transparent hover:bg-primary/10"}`}
          >
            <div>{g.title}</div>
            <div className="text-xs text-gray-500">{g.players} ({g.year})</div>
          </button>
        ))}
      </div>
      {/* Replay Board and Moves */}
      <div className="flex-1 flex flex-col items-center">
        <ChessboardUI fen={fen} />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={moveIdx === 0}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-mono text-lg">Move {moveIdx} / {game.moves.length}</span>
          <button
            onClick={handleNext}
            disabled={moveIdx === game.moves.length}
            className="px-4 py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="mt-4 w-full max-w-xl bg-gray-50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
          {game.moves.map((move, idx) => (
            <span
              key={idx}
              className={`inline-block px-2 py-1 rounded ${idx === moveIdx - 1 ? "bg-primary text-white" : "text-gray-700"}`}
            >
              {idx % 2 === 0 ? `${Math.floor(idx / 2) + 1}. ` : ""}{move}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 