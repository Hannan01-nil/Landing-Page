import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Hero } from "@/app/lib/models/hero";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await Hero.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { badge: "Introducing\nKhelo\nSporting", badgeMobile: "Introducing Khelo Sporting", titleFirst: "S", titleMiddle: "portin", titleLast: "g", description: "", ctaText: "Book A Ticket", ctaLink: "#matches", image: "/images/football.jpg" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await Hero.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
