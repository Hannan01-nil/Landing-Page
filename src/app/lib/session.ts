import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createSession(payload: { id: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string };
  } catch {
    return null;
  }
}
