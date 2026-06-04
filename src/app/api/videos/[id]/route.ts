import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Video } from "@/app/lib/models/video";
import { videoSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = videoSchema.parse(body);
    await connectDB();
    const video = await Video.findByIdAndUpdate(id, data, { returnDocument: "after" });
    if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(video);
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
    const video = await Video.findByIdAndDelete(id);
    if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
