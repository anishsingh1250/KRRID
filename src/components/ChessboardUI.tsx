"use client";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

// Optionally import a move sound
// import moveSound from "@/public/move.mp3";

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

// Helper to determine if it's the user's turn in multiplayer
function isPlayersTurn({ userId, player_white, player_black, turn }: {
  userId?: string;
  player_white?: string;
  player_black?: string;
  turn?: string;
}) {
  if (!userId || !player_white || !player_black || !turn) return false;
  if (turn === "w") return userId === player_white;
  if (turn === "b") return userId === player_black;
  return false;
}

type ChessboardUIProps = {
  fen?: string;
  turn?: string;
  makeMove?: (fen: string, move: Move, turn: string) => void;
  moves?: Move[];
  userId?: string;
  player_white?: string;
  player_black?: string;
  multiplayer?: boolean;
  showAnalysis?: boolean;
  boardWidth?: number;
  boardOrientation?: 'white' | 'black';
  customLightSquareStyle?: Record<string, string>;
  customDarkSquareStyle?: Record<string, string>;
  pieceTheme?: string;
};

export default function ChessboardUI(props: ChessboardUIProps) {
  // Remove internal FEN/orientation state; use only props
  const [lastMoveSquares, setLastMoveSquares] = useState<{from: string, to: string} | null>(null);

  // Clear last move highlight when new game starts
  useEffect(() => {
    if (props.fen === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      setLastMoveSquares(null);
    }
  }, [props.fen]);

  // Play move sound (optional)
  // function playMoveSound() {
  //   const audio = new Audio(moveSound);
  //   audio.play();
  // }

  // Piece theme selection (future: add more sets)
  const customPieces = undefined;
  if (props.pieceTheme === 'alpha') {
    // customPieces = ... (future: implement alpha set)
  } else if (props.pieceTheme === 'fantasy') {
    // customPieces = ... (future: implement fantasy set)
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    // Multiplayer: only allow move if it's the user's turn
    if (props.multiplayer) {
      if (!isPlayersTurn({
        userId: props.userId,
        player_white: props.player_white,
        player_black: props.player_black,
        turn: props.turn,
      })) {
        return false;
      }
      const chess = new Chess(props.fen);
      const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (move) {
        setLastMoveSquares({ from: sourceSquare, to: targetSquare });
        // playMoveSound();
        if (props.makeMove) props.makeMove(chess.fen(), move, chess.turn());
        return true;
      }
      return false;
    } else {
      // Single-player: allow both sides to move
      const chess = new Chess(props.fen);
      const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (move) {
        setLastMoveSquares({ from: sourceSquare, to: targetSquare });
        // playMoveSound();
        if (props.makeMove) props.makeMove(chess.fen(), move, chess.turn());
        return true;
      }
      return false;
    }
  }

  // Highlight last move squares
  function customSquareStyles() {
    if (!lastMoveSquares) return {};
    return {
      [lastMoveSquares.from]: {
        background: "radial-gradient(circle, #ffe680 60%, transparent 100%)",
      },
      [lastMoveSquares.to]: {
        background: "radial-gradient(circle, #ffe680 60%, transparent 100%)",
      },
    };
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-gradient-to-br from-[#f0d9b5] to-[#b58863] p-3 rounded-2xl shadow-2xl border-4 border-[#b58863]">
        <Chessboard
          position={props.fen}
          boardWidth={props.boardWidth || 420}
          customLightSquareStyle={props.customLightSquareStyle}
          customDarkSquareStyle={props.customDarkSquareStyle}
          arePiecesDraggable={props.multiplayer ? isPlayersTurn({
            userId: props.userId,
            player_white: props.player_white,
            player_black: props.player_black,
            turn: props.turn,
          }) : true}
          animationDuration={200}
          onPieceDrop={onDrop}
          boardOrientation={props.boardOrientation || 'white'}
          customSquareStyles={customSquareStyles()}
          customPieces={customPieces}
        />
      </div>
    </div>
  );
} 