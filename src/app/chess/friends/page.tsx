"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ChessFriendsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black flex flex-col items-center justify-center w-full py-12 px-4">
      <div className="w-full max-w-xl flex flex-col items-center gap-8 bg-[#181f2b] rounded-2xl p-10 shadow-2xl border border-blue-900">
        <Image src="/chessboard.svg" alt="Play with Friends" width={120} height={120} className="mb-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Play Chess with Friends</h1>
        <p className="text-lg text-gray-300 text-center max-w-md mb-4">
          Challenge your friends to a chess match online! Share a private game link and play in real time. No registration required.
        </p>
        <button
          onClick={() => router.push("/chess/play/friends")}
          className="px-8 py-4 rounded-xl bg-sky-600 text-white text-xl font-bold shadow-lg hover:bg-sky-700 transition-all mt-2"
        >
          Start a Game with a Friend
        </button>
      </div>
    </div>
  );
} 