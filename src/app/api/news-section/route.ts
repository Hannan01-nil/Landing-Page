import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { NewsSection } from "@/app/lib/models/newsSection";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await NewsSection.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { title: "Latest News", ctaText: "See All News", ctaLink: "#about" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await NewsSection.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
