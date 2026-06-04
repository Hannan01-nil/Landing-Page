import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { SubscribeSection } from "@/app/lib/models/subscribeSection";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await SubscribeSection.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { title: "Subscribe to our newsletter", placeholder: "Enter your email", buttonText: "Subscribe" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await SubscribeSection.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
