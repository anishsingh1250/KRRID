"use client";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import ChessboardUI from "@/components/ChessboardUI";

export default function MultiplayerGamePage() {
  const params = useParams();
  const gameId = params?.gameId as string;
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth?asPlayer=true");
  }

  // const { game, makeMove } = useRealtimeChessGame(gameId, userId!);

  if (!gameId || !userId) return <div>Loading...</div>;

  // Multiplayer not implemented
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Multiplayer Not Available</h1>
      <p className="text-lg text-gray-300 mb-8">This feature is not yet implemented. Please check back later!</p>
      <button onClick={() => router.push('/chess')} className="px-6 py-2 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 transition-all">Back to Chess Home</button>
    </div>
  );
} 