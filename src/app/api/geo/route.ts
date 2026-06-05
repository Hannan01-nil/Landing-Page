import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Geo } from "@/app/lib/models/geo";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await Geo.findOne().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data || {});
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await Geo.findOneAndUpdate(
      {}, body, { upsert: true, returnDocument: "after" }
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
