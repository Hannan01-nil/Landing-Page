import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { About } from "@/app/lib/models/about";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await About.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { badge: "⊕ About Us", title: "Who we are", description: "", image: "/images/football.jpg", ctaText: "Read More", ctaLink: "#products" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await About.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
