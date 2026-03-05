import { cookies } from "next/headers";
import Link from "next/link";

export default function Dashboard() {
  const user = cookies().get("ssteam_user")?.value;

  if (!user) {
    return (
      <main className="min-h-screen ssteam-bg flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[520px] ssteam-card rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Not logged in</h1>
          <p className="mt-1 text-sm text-white/55">Please login first.</p>
          <div className="mt-4">
            <Link className="text-red-200 underline" href="/login">Go to login</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen ssteam-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[820px] ssteam-card rounded-2xl p-6 sm:p-8">
        <div className="text-[11px] tracking-[0.25em] text-red-300/80 uppercase">
          SSTEAM GUESS — Target 90% (Backtest Based)
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-white/55">Welcome, <b>{user}</b></p>
          </div>

          <form action="/api/auth/logout" method="post">
            <button className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold">
              Logout
            </button>
          </form>
        </div>

        <div className="mt-5 rounded-xl ssteam-border bg-black/70 h-[260px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs tracking-[0.35em] text-white/60">SIGNAL PANEL</div>
            <div className="mt-3 text-3xl font-extrabold">READY</div>
            <div className="mt-2 text-sm text-white/55">Put your protected dashboard UI here.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
