"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c1b2a]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-xl">
        <h1 className="display text-3xl text-center mb-6">Khelo CMS</h1>
        <p className="text-center text-sm text-gray-500 mb-8">Admin Login</p>

        {error && (
          <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              suppressHydrationWarning
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1b2a]"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suppressHydrationWarning
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1b2a]"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            suppressHydrationWarning
            className="w-full rounded bg-[#0c1b2a] py-2.5 text-sm font-semibold text-white hover:bg-[#1a3045] transition-colors"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
