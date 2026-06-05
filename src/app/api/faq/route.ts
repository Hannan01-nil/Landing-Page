import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Faq } from "@/app/lib/models/faq";
import { requireAdmin } from "@/app/lib/dal";
import { faqSchema } from "@/app/lib/validations";

export async function GET() {
  await connectDB();
  const data = await Faq.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = faqSchema.parse(body);
    await connectDB();
    const data = await Faq.create(parsed);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
