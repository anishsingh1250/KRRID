"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

const roles = ["student", "admin"];

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const asPlayer = searchParams ? searchParams.get("asPlayer") : null;
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const userRole = session?.user?.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    });

    // Also check on mount (for reloads)
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const userRole = data.user.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [asPlayer, router]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (mode === "signup") {
      if (password !== confirm) {
        setMessage("Passwords do not match");
        setLoading(false);
        return;
      }
      // Always set role to 'student' for signup, and include name
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: "student", name } },
      });
      setLoading(false);
      setMessage(error ? error.message : "Check your email to confirm your account.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setMessage(error.message);
      } else {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const user = data.user;
          const userRole = user?.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setResetMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    setLoading(false);
    setResetMsg(error ? error.message : "Check your email for a password reset link.");
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
    if (error) setMessage(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-card p-8 w-full max-w-md flex flex-col gap-6 border border-gray-200">
        <div className="flex justify-center gap-4 mb-2">
          <button
            className={`font-heading px-4 py-2 rounded-lg transition-colors ${mode === "login" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`font-heading px-4 py-2 rounded-lg transition-colors ${mode === "signup" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <button
          type="button"
          className="bg-primary text-white rounded-lg px-4 py-2 font-heading text-base transition-transform duration-200 hover:scale-105 mb-2"
          onClick={handleGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>

        <form className="flex flex-col gap-4" onSubmit={handleAuth}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Name"
              required
              className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          )}
          <button
            type="submit"
            className="bg-primary text-white rounded-lg px-4 py-2 font-heading text-lg transition-transform duration-200 hover:scale-105 hover:bg-primary disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Processing..." : (mode === "signup" ? "Sign Up" : "Login")}
          </button>
        </form>

        {message && (
          <div className="text-red-500 text-center">{message}</div>
        )}

        {!showReset ? (
              <button
            className="text-primary text-sm hover:underline"
            onClick={() => setShowReset(true)}
              >
            Forgot Password?
              </button>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
                      <button
              type="submit"
              className="bg-primary text-white rounded-lg px-4 py-2 font-heading text-base transition-transform duration-200 hover:scale-105"
              disabled={loading}
                      >
              Reset Password
                      </button>
            {resetMsg && (
              <div className="text-red-500 text-center">{resetMsg}</div>
            )}
            <button
              type="button"
              className="text-primary text-sm hover:underline"
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
} 
