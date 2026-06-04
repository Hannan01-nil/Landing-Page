import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ProductSection } from "@/app/lib/models/productSection";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const data = await ProductSection.findOne().sort({ createdAt: -1 });
  return NextResponse.json(data || { title: "Top products\n✳ in our listing", description: "Explore our top products...", ctaText: "Explore All", ctaLink: "#subscribe" });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await ProductSection.findOneAndUpdate({}, body, { upsert: true, returnDocument: "after" });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
