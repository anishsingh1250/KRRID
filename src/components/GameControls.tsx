import React from 'react';
import { 
  SkipBack, 
  SkipForward, 
  Pause, 
  Play,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download
} from 'lucide-react';

interface GameControlsProps {
  onGoToStart: () => void;
  onGoToPrevious: () => void;
  onGoToNext: () => void;
  onGoToEnd: () => void;
  onPlay: () => void;
  onPause: () => void;
  onLoadPgn: () => void;
  onExportPgn: () => void;
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onGoToStart,
  onGoToPrevious,
  onGoToNext,
  onGoToEnd,
  onPlay,
  onPause,
  onLoadPgn,
  onExportPgn,
  isPlaying,
  canGoBack,
  canGoForward
}) => {
  return (
    <div className="flex items-center justify-center gap-1 p-3 bg-white rounded-lg shadow-md">
      {/* Go to start */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onGoToStart}
        disabled={!canGoBack}
        title="Go to start"
      >
        <SkipBack className="w-3 h-3" />
      </button>
      
      {/* Previous move */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onGoToPrevious}
        disabled={!canGoBack}
        title="Previous move"
      >
        <ChevronLeft className="w-3 h-3" />
      </button>
      
      {/* Play/Pause */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={isPlaying ? onPause : onPlay}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
      </button>
      
      {/* Next move */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onGoToNext}
        disabled={!canGoForward}
        title="Next move"
      >
        <ChevronRight className="w-3 h-3" />
      </button>
      
      {/* Go to end */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onGoToEnd}
        disabled={!canGoForward}
        title="Go to end"
      >
        <SkipForward className="w-3 h-3" />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Load PGN */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onLoadPgn}
        title="Import PGN"
      >
        <Upload className="w-3 h-3" />
      </button>

      {/* Export PGN */}
      <button
        type="button"
        className="hover:bg-gray-50 transition-colors h-8 w-8"
        onClick={onExportPgn}
        title="Export PGN"
      >
        <Download className="w-3 h-3" />
      </button>
    </div>
  );
};

export default GameControls;
