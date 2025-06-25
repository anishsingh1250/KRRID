// This file was deleted. Please provide the original content to restore it, or let me know if you want a placeholder component.
import React from "react";

const ChessSpinner: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex flex-col items-center justify-center min-h-[120px]"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        {/* Knight chess piece silhouette */}
        <path
          d="M36 40H12V38C12 34 16 32 16 28C16 24 12 22 12 18C12 12 20 8 28 8C36 8 36 16 32 18C36 20 36 24 36 28C36 32 40 34 40 38V40H36Z"
          fill="#fbbf24"
          stroke="#18181b"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#18181b"
          strokeWidth="2"
          opacity="0.15"
        />
      </svg>
      <span className="mt-2 text-gray-600 text-sm font-medium">Loading...</span>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChessSpinner; 