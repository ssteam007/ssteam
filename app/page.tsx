export default function Home() {
  return (
    <main className="min-h-screen ssteam-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[700px] ssteam-card rounded-2xl p-6 sm:p-8">
        <div className="text-[11px] tracking-[0.25em] text-red-300/80 uppercase">
          SSTEAM GUESS — Target 90% (Backtest Based)
        </div>
        <h1 className="mt-2 text-2xl font-bold">Welcome</h1>
        <p className="mt-1 text-sm text-white/55">
          Register account, then admin will approve. Premium default expiry is 7 days.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a className="ssteam-btn" href="/register">Register</a>
          <a className="ssteam-btn" href="/login">Login</a>
        </div>

        <div className="mt-4 text-xs text-white/45">
          Admin panel: <a className="underline" href="/admin">/admin</a>
        </div>
      </div>
    </main>
  );
}
