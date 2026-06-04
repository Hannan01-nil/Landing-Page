import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Admin } from "@/app/lib/models/admin";
import { createSession } from "@/app/lib/session";
import { loginSchema } from "@/app/lib/validations";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    await connectDB();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSession({ id: admin._id.toString(), email: admin.email });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, email: admin.email });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
