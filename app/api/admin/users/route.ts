import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const key = req.headers.get("x-admin-key") || "";
  if (key !== process.env.ADMIN_PANEL_KEY) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const pageSize = Math.min(Math.max(parseInt(searchParams.get("pageSize") || "10", 10), 5), 50);

  const where = q ? { username: { contains: q, mode: "insensitive" as const } } : {};

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, username: true, role: true, isActive: true, plan: true, expiresAt: true, createdAt: true },
    }),
  ]);

  return NextResponse.json({ users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}
