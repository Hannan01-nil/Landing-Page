import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { NewsArticle } from "@/app/lib/models/newsArticle";
import { newsArticleSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const articles = await NewsArticle.find().sort({ createdAt: -1 });
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = newsArticleSchema.parse(body);
    await connectDB();
    const article = await NewsArticle.create(data);
    return NextResponse.json(article, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
