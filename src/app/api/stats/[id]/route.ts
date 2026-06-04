import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Stat } from "@/app/lib/models/stat";
import { statSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = statSchema.parse(body);
    await connectDB();
    const stat = await Stat.findByIdAndUpdate(id, data, { returnDocument: "after" });
    if (!stat) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(stat);
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
    const stat = await Stat.findByIdAndDelete(id);
    if (!stat) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
