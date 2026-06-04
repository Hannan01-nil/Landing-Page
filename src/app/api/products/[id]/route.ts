import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Product } from "@/app/lib/models/product";
import { productSchema } from "@/app/lib/validations";
import { requireAdmin } from "@/app/lib/dal";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = productSchema.parse(body);
    await connectDB();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
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
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
