import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Admin } from "@/app/lib/models/admin";
import { getSession } from "@/app/lib/dal";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/app/lib/validations";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    await connectDB();

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    await Admin.create({ email, password: hashed });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
