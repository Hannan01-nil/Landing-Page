import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { About } from "@/app/lib/models/about";
import { aboutSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const about = await About.findOne().sort({ createdAt: -1 });
  return NextResponse.json(about);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = aboutSchema.parse(body);
    await connectDB();
    const about = await About.findOneAndUpdate({}, data, { upsert: true, new: true });
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
