import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Hero } from "@/app/lib/models/hero";
import { heroSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const hero = await Hero.findOne().sort({ createdAt: -1 });
  return NextResponse.json(hero);
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = heroSchema.parse(body);
    await connectDB();
    const hero = await Hero.findOneAndUpdate({}, data, { upsert: true, new: true });
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
