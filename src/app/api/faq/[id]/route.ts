import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Faq } from "@/app/lib/models/faq";
import { requireAdmin } from "@/app/lib/dal";
import { faqSchema } from "@/app/lib/validations";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = faqSchema.parse(body);
    await connectDB();
    const data = await Faq.findByIdAndUpdate(id, parsed, { returnDocument: "after" });
    return NextResponse.json(data);
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
    await Faq.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
