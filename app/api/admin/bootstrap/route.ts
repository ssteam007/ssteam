import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const key = req.headers.get("x-admin-key") || "";
  if (!process.env.ADMIN_PANEL_KEY || key !== process.env.ADMIN_PANEL_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const username = process.env.ADMIN_USERNAME || "mirza";
  const password = process.env.ADMIN_PASSWORD || "Gujrat123@";

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) return NextResponse.json({ ok: true, message: "Admin already exists" });

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { username, password: hash, role: "ADMIN", isActive: true, plan: "PREMIUM", expiresAt: null },
  });

  return NextResponse.json({ ok: true, message: "Admin created" });
}
