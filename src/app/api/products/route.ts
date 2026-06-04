import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Product } from "@/app/lib/models/product";
import { productSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = productSchema.parse(body);
    await connectDB();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
