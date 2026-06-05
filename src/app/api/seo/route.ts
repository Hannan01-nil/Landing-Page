import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Seo } from "@/app/lib/models/seo";
import { requireAdmin } from "@/app/lib/dal";

const defaultEntries = [
  { route: "/", title: "", description: "", ogImage: "" },
  { route: "/matches", title: "", description: "", ogImage: "" },
  { route: "/videos", title: "", description: "", ogImage: "" },
  { route: "/news", title: "", description: "", ogImage: "" },
  { route: "/about", title: "", description: "", ogImage: "" },
  { route: "/stats", title: "", description: "", ogImage: "" },
  { route: "/products", title: "", description: "", ogImage: "" },
  { route: "/subscribe", title: "", description: "", ogImage: "" },
];

export async function GET() {
  await connectDB();
  const data = await Seo.findOne().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data || { entries: defaultEntries });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    await connectDB();
    const data = await Seo.findOneAndUpdate(
      {}, body, { upsert: true, returnDocument: "after" }
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
