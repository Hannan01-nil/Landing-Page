import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { UpcomingMatch } from "@/app/lib/models/upcomingMatch";
import { upcomingMatchSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const match = await UpcomingMatch.findOne().sort({ createdAt: -1 });
  return NextResponse.json(match);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = upcomingMatchSchema.parse(body);
    await connectDB();
    const match = await UpcomingMatch.findOneAndUpdate({}, data, { upsert: true, returnDocument: "after" });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
