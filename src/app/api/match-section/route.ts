import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { MatchSection } from "@/app/lib/models/matchSection";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await MatchSection.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { title: "Khelo sporting info\nand updates" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await MatchSection.findOneAndUpdate({}, { title: body.title }, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
