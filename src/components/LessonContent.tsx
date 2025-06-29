import React, { useState, useEffect, useCallback } from 'react';
import GameControls from './GameControls';
import PgnImportDialog from './PgnImportDialog';
import { useChessGame } from '@/hooks/useChessGame';
import { type Lesson } from '@/hooks/useSupabaseData';
import { Download, Settings, Calendar, Users, Trophy } from 'lucide-react';

interface LessonContentProps {
  lesson: Lesson | null;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [showPgnDialog, setShowPgnDialog] = useState(false);
  
  const {
    gameState,
    goToStart,
    goToPrevious,
    goToNext,
    goToEnd,
    loadPgn,
    getPgn
  } = useChessGame(lesson?.pgn, lesson?.fen);

  const handlePlay = () => {
    if (!isPlaying && gameState.currentMoveIndex < gameState.history.length - 1) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        if (gameState.currentMoveIndex < gameState.history.length - 1) {
          goToNext();
        } else {
          setIsPlaying(false);
          clearInterval(interval);
          setAutoPlayInterval(null);
        }
      }, 1500);
      setAutoPlayInterval(interval);
    }
  };

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  }, [autoPlayInterval]);

  // Stop autoplay when reaching the end
  useEffect(() => {
    if (isPlaying && gameState.currentMoveIndex >= gameState.history.length - 1) {
      handlePause();
    }
  }, [gameState.currentMoveIndex, gameState.history.length, isPlaying, handlePause]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [autoPlayInterval]);

  const handleLoadPgn = () => {
    setShowPgnDialog(true);
  };

  const handlePgnImport = (pgn: string) => {
    try {
      const success = loadPgn(pgn);
      if (success) {
        alert("PGN Imported Successfully");
        console.log('PGN successfully loaded:', pgn);
      } else {
        alert("Import Failed");
      }
    } catch (error) {
      console.error('PGN import error:', error);
      alert("Import Error");
    }
  };

  const handleExportPgn = () => {
    try {
      const pgn = getPgn();
      if (pgn) {
        const blob = new Blob([pgn], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${lesson?.title || 'chess-game'}.pgn`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert("PGN Exported");
      } else {
        alert("Export Failed");
      }
    } catch (error) {
      console.error('Export error:', error);
      alert("Export Error");
    }
  };

  const handleMoveClick = (moveIndex: number) => {
    // Navigate to specific move when clicked
    if (moveIndex <= gameState.currentMoveIndex) {
      // Go backwards
      while (gameState.currentMoveIndex > moveIndex) {
        goToPrevious();
      }
    } else {
      // Go forwards
      while (gameState.currentMoveIndex < moveIndex) {
        goToNext();
      }
    }
  };

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-96 text-center">
          <div className="mb-4">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Select a lesson to begin
          </h3>
          <p className="text-gray-500 mb-4">
            Choose a lesson from the sidebar to start learning chess
          </p>
          <button 
            type="button" 
            onClick={() => window.open('/admin', '_blank')}
            className="w-full"
          >
            <Settings className="w-4 h-4 mr-2" />
            Go to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            type="button" 
            className="text-gray-600 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Lesson
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-gray-800">{lesson.title}</h1>
              <button
                type="button"
                onClick={handleExportPgn}
                className="text-blue-600 hover:text-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PGN
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Game Info */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {lesson.date_played && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {lesson.date_played}
                </div>
              )}
              {(lesson.white_player || lesson.black_player) && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {lesson.white_player || 'White'} vs {lesson.black_player || 'Black'}
                </div>
              )}
              {lesson.result && (
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {lesson.result}
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="flex items-center gap-4">
              <GameControls
                onGoToStart={goToStart}
                onGoToPrevious={goToPrevious}
                onGoToNext={goToNext}
                onGoToEnd={goToEnd}
                onPlay={handlePlay}
                onPause={handlePause}
                onLoadPgn={handleLoadPgn}
                onExportPgn={handleExportPgn}
                isPlaying={isPlaying}
                canGoBack={gameState.currentMoveIndex > -1}
                canGoForward={gameState.currentMoveIndex < gameState.history.length - 1}
              />
            </div>

            {/* Game Status */}
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-white px-3 py-1 rounded-full border">
                Move: {gameState.currentMoveIndex + 1}/{gameState.history.length}
              </span>
              <span className="bg-white px-3 py-1 rounded-full border">
                Turn: {gameState.turn === 'w' ? 'White' : 'Black'}
              </span>
              {gameState.isCheck && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200 font-semibold">
                  Check!
                </span>
              )}
              {gameState.gameStatus !== 'playing' && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200 font-semibold capitalize">
                  {gameState.gameStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {lesson.description && (
            <div>
              <h2 className="text-lg">Lesson Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {lesson.description}
              </p>
            </div>
          )}

          {/* Move History */}
          {gameState.history.length > 0 && (
            <div>
              <h2 className="text-lg">Move History</h2>
              <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <div className="grid grid-cols-8 gap-1 text-sm font-mono">
                  {gameState.history.map((move, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoveClick(index)}
                      className={`text-left p-2 rounded hover:bg-gray-200 transition-colors ${
                        index === gameState.currentMoveIndex ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'} {move}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technical Information */}
          <div>
            <h2 className="text-lg">Technical Information</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Position:</span>
                  <span className="ml-2 text-gray-600">{lesson.position}</span>
                </div>
                {lesson.date_played && (
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="ml-2 text-gray-600">{lesson.date_played}</span>
                  </div>
                )}
                {lesson.white_player && (
                  <div>
                    <span className="font-medium text-gray-700">White:</span>
                    <span className="ml-2 text-gray-600">{lesson.white_player}</span>
                  </div>
                )}
                {lesson.black_player && (
                  <div>
                    <span className="font-medium text-gray-700">Black:</span>
                    <span className="ml-2 text-gray-600">{lesson.black_player}</span>
                  </div>
                )}
                {lesson.result && (
                  <div>
                    <span className="font-medium text-gray-700">Result:</span>
                    <span className="ml-2 text-gray-600">{lesson.result}</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="font-medium text-gray-700">Current FEN:</span>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg">
                  <code className="text-xs text-gray-800 break-all">{gameState.position}</code>
                </div>
              </div>
              {lesson.pgn && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Original PGN:</span>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg max-h-32 overflow-y-auto">
                    <code className="text-xs text-gray-800 whitespace-pre-wrap">{lesson.pgn}</code>
                  </div>
                </div>
              )}
              {gameState.history.length > 0 && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Current Game PGN:</span>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg max-h-32 overflow-y-auto">
                    <code className="text-xs text-gray-800 whitespace-pre-wrap">{getPgn()}</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PgnImportDialog
        open={showPgnDialog}
        onOpenChange={setShowPgnDialog}
        onImport={handlePgnImport}
      />
    </div>
  );
};

export default LessonContent;
