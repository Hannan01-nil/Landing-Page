import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Subscriber } from "@/app/lib/models/subscriber";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    await connectDB();
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" });
    }
    await Subscriber.create({ email });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
