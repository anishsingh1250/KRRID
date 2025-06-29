"use client";
import { useState } from "react";
import ChessboardUI from "@/components/ChessboardUI";
import { useChessGame } from "@/hooks/useChessGame";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChessMainPage() {
  const router = useRouter();
  const { gameState, makeMove, reset, goToPrevious, goToNext } = useChessGame();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');

  function handleMove(fen: string, move: any, turn: string) {
    makeMove(move.from, move.to, move.promotion);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-8 py-10 px-4">
        {/* Chessboard Section */}
        <div className="flex flex-col items-center bg-[#23272b] rounded-2xl p-6 shadow-xl border border-blue-900">
          <ChessboardUI
            fen={gameState.position}
            boardOrientation={orientation}
            boardWidth={480}
          />
        </div>
        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-8 justify-center items-center md:items-start mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Play Chess Online<br/>on the <span className="text-blue-400">#1 Site!</span></h1>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="flex items-center gap-4 bg-sky-600/90 rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform border-2 border-sky-700" onClick={() => router.push("/chess/multiplayer")}> 
              <Image src="/play-online.png" alt="Play Online" width={56} height={56} />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">Play Online</span>
                <span className="text-white text-base font-medium mt-1">Play with someone at your level</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-800/90 rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform border-2 border-gray-700" onClick={() => router.push("/chess/play")}> 
              <Image src="/play-computer.png" alt="Play Computer" width={56} height={56} />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">Play Computer</span>
                <span className="text-gray-200 text-base font-medium mt-1">Play vs customizable training bots</span>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <h2 className="text-2xl font-bold text-white mb-3">Solve Chess Puzzles</h2>
            <div className="bg-blue-900/80 rounded-xl p-4 flex items-center gap-4 shadow-lg cursor-pointer hover:scale-105 transition-transform border-2 border-blue-700" onClick={() => router.push("/chess/puzzles")}> 
              <Image src="/chessboard.svg" alt="Puzzles" width={60} height={60} />
              <span className="text-lg text-white font-semibold">Sharpen your skills with fun puzzles!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 