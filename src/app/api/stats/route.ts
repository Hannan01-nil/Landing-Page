import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Stat } from "@/app/lib/models/stat";
import { statSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const stats = await Stat.find().sort({ createdAt: -1 });
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = statSchema.parse(body);
    await connectDB();
    const stat = await Stat.create(data);
    return NextResponse.json(stat, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
