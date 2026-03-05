import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const u = (username || "").trim();
  const p = (password || "").trim();

  const user = await prisma.user.findUnique({ where: { username: u } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(p, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  if (!user.isActive) return NextResponse.json({ error: "Account not active. Admin approval required." }, { status: 403 });

  if (user.plan === "PREMIUM" && user.expiresAt && user.expiresAt.getTime() < Date.now()) {
    await prisma.user.update({ where: { id: user.id }, data: { plan: "FREE", expiresAt: null } });
    return NextResponse.json({ error: "Subscription expired. Contact admin." }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true, role: user.role, plan: user.plan });
  res.cookies.set("ssteam_user", user.username, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("ssteam_role", user.role, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
