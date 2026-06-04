import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Match } from "@/app/lib/models/match";
import { matchSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const matches = await Match.find().sort({ createdAt: -1 });
  return NextResponse.json(matches);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = matchSchema.parse(body);
    await connectDB();
    const match = await Match.create(data);
    return NextResponse.json(match, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
