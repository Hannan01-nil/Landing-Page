import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Match } from "@/app/lib/models/match";
import { matchSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = matchSchema.parse(body);
    await connectDB();
    const match = await Match.findByIdAndUpdate(id, data, { returnDocument: "after" });
    if (!match) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await connectDB();
    const match = await Match.findByIdAndDelete(id);
    if (!match) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
