import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Subscriber } from "@/app/lib/models/subscriber";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await request.json();
    await connectDB();
    await Subscriber.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
