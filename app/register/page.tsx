"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const r = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true); setMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const j = await res.json();
    setLoading(false);

    if (!res.ok) return setMsg(j.error || "Error");
    setMsg(j.message || "Registered.");

    setTimeout(() => r.push("/login"), 900);
  }

  return (
    <main className="min-h-screen ssteam-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px] ssteam-card rounded-2xl p-6 sm:p-8">
        <div className="text-[11px] tracking-[0.25em] text-red-300/80 uppercase">
          SSTEAM GUESS — Target 90% (Backtest Based)
        </div>
        <h1 className="mt-2 text-2xl font-bold">Register</h1>
        <p className="mt-1 text-sm text-white/55">Account will be pending until admin approves.</p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input className="ssteam-input" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input className="ssteam-input" placeholder="Password (min 6)" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {msg ? <div className="text-sm font-semibold text-red-200">{msg}</div> : null}
          <button className="ssteam-btn" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </form>

        <div className="mt-4 text-sm text-white/55">
          Already have account? <a className="text-red-200 underline" href="/login">Login</a>
        </div>
      </div>
    </main>
  );
}
