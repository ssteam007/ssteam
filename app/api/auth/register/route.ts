import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const u = (username || "").trim();
  const p = (password || "").trim();

  if (u.length < 3) return NextResponse.json({ error: "Username min 3" }, { status: 400 });
  if (p.length < 6) return NextResponse.json({ error: "Password min 6" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { username: u } });
  if (exists) return NextResponse.json({ error: "Username exists" }, { status: 409 });

  const hash = await bcrypt.hash(p, 10);
  await prisma.user.create({
    data: { username: u, password: hash, role: "USER", isActive: false, plan: "FREE", expiresAt: null },
  });

  return NextResponse.json({ ok: true, message: "Registered. Wait for admin approval." });
}
