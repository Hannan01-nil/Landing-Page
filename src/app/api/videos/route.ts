import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Video } from "@/app/lib/models/video";
import { videoSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const videos = await Video.find().sort({ createdAt: -1 });
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = videoSchema.parse(body);
    await connectDB();
    const video = await Video.create(data);
    return NextResponse.json(video, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
