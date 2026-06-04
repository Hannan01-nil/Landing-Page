import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { NewsArticle } from "@/app/lib/models/newsArticle";
import { newsArticleSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = newsArticleSchema.parse(body);
    await connectDB();
    const article = await NewsArticle.findByIdAndUpdate(id, data, { new: true });
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(article);
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
    const article = await NewsArticle.findByIdAndDelete(id);
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
