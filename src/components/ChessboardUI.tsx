"use client";
import { useState, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

type ChessboardUIProps = {
  fen?: string;
  turn?: string;
  makeMove?: (fen: string, move: any, turn: string) => void;
  moves?: any[];
  userId?: string;
  player_white?: string;
  player_black?: string;
  multiplayer?: boolean;
  showAnalysis?: boolean;
  boardWidth?: number;
};

export default function ChessboardUI(props: ChessboardUIProps) {
  // Only render the chessboard, no controls, no move history, no analysis, no messages
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-gradient-to-br from-[#f0d9b5] to-[#b58863] p-3 rounded-2xl shadow-2xl border-4 border-[#b58863]">
        <Chessboard
          position={props.fen}
          boardWidth={props.boardWidth || 420}
          customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
          customDarkSquareStyle={{ backgroundColor: "#b58863" }}
          arePiecesDraggable={false}
          animationDuration={200}
        />
      </div>
    </div>
  );
} 