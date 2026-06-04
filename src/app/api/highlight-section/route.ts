import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { HighlightSection } from "@/app/lib/models/highlightSection";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await HighlightSection.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { title: "Highlighted Match", description: "An exciting match...", featuredImage: "/images/blog-1.jpg", featuredAlt: "Highlighted match" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await HighlightSection.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
