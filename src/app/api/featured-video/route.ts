import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { FeaturedVideo } from "@/app/lib/models/featuredVideo";
import { featuredVideoSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const video = await FeaturedVideo.findOne().sort({ createdAt: -1 });
  return NextResponse.json(video);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = featuredVideoSchema.parse(body);
    await connectDB();
    const video = await FeaturedVideo.findOneAndUpdate({}, data, { upsert: true, new: true });
    return NextResponse.json(video);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
