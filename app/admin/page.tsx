"use client";
import { useEffect, useMemo, useState } from "react";

type U = { id: string; username: string; role: string; isActive: boolean; plan: string; expiresAt: string | null };

export default function Admin() {
  const [adminKey, setAdminKey] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [users, setUsers] = useState<U[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [msg, setMsg] = useState("");

  const url = useMemo(() => `/api/admin/users?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}`, [q, page]);

  async function load() {
    setMsg("");
    const r = await fetch(url, { headers: { "x-admin-key": adminKey } });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "Error");
    setUsers(j.users || []);
    setTotalPages(j.totalPages || 1);
  }

  async function action(userId: string, body: any) {
    setMsg("");
    const r = await fetch("/api/admin/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ userId, ...body }),
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "Error");
    load();
  }

  useEffect(() => { if (adminKey) load(); }, [adminKey, url]);

  return (
    <main className="min-h-screen ssteam-bg px-4 py-10">
      <div className="max-w-[980px] mx-auto ssteam-card rounded-2xl p-6 sm:p-8">
        <div className="text-[11px] tracking-[0.25em] text-red-300/80 uppercase">
          Admin Panel — SSTEAM GUESS
        </div>
        <h1 className="mt-2 text-2xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-white/55">Search + pagination + approve + premium (7 days).</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input className="ssteam-input sm:col-span-1" placeholder="Admin Key (ADMIN_PANEL_KEY)" value={adminKey} onChange={(e)=>setAdminKey(e.target.value)} />
          <input className="ssteam-input sm:col-span-2" placeholder="Search username..." value={q} onChange={(e)=>{setQ(e.target.value); setPage(1);}} />
        </div>

        {msg ? <div className="mt-3 text-sm font-semibold text-red-200">{msg}</div> : null}

        <div className="mt-5 space-y-3">
          {users.map(u => (
            <div key={u.id} className="rounded-xl ssteam-border bg-black/60 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="font-extrabold">{u.username}</div>
                  <div className="text-xs text-white/55">
                    Active: {String(u.isActive)} • Plan: {u.plan} • Exp: {u.expiresAt ? new Date(u.expiresAt).toLocaleString() : "—"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold"
                    onClick={() => action(u.id, { isActive: !u.isActive })}
                  >
                    {u.isActive ? "Deactivate" : "Approve"}
                  </button>

                  <button
                    className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold"
                    onClick={() => action(u.id, { action: "SET_PREMIUM_7D" })}
                  >
                    Set PREMIUM (7 days)
                  </button>

                  <button
                    className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold"
                    onClick={() => action(u.id, { action: "SET_FREE" })}
                  >
                    Set FREE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold disabled:opacity-50"
            disabled={page <= 1}
            onClick={()=>setPage(p=>p-1)}
          >
            Prev
          </button>
          <div className="text-sm text-white/60">Page <b className="text-white/80">{page}</b> / {totalPages}</div>
          <button
            className="px-4 py-2 rounded-xl border border-red-500/40 bg-black/60 font-semibold disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={()=>setPage(p=>p+1)}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
