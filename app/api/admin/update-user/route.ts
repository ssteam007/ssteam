import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const key = req.headers.get("x-admin-key") || "";
  if (key !== process.env.ADMIN_PANEL_KEY) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const userId = body.userId as string;

  const patch: any = {};
  if (typeof body.isActive === "boolean") patch.isActive = body.isActive;

  if (body.action === "SET_PREMIUM_7D") {
    patch.isActive = true;
    patch.plan = "PREMIUM";
    patch.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  if (body.action === "SET_FREE") {
    patch.plan = "FREE";
    patch.expiresAt = null;
  }

  await prisma.user.update({ where: { id: userId }, data: patch });
  return NextResponse.json({ ok: true });
}
