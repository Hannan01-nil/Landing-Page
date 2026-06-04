"use client";

import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

export default function AboutPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    badge: "⊕ About Us",
    title: "Who we are",
    description: "",
    image: "/images/football.jpg",
    ctaText: "Read More",
    ctaLink: "#products",
  });

  async function fetchItem() {
    const res = await fetch("/api/about");
    const data = await res.json();
    if (data) setForm({ badge: data.badge || "⊕ About Us", title: data.title || "Who we are", description: data.description || "", image: data.image || "/images/football.jpg", ctaText: data.ctaText || "Read More", ctaLink: data.ctaLink || "#products" });
  }

  useEffect(() => { fetchItem(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) toast("About section saved!"); else toast("Failed to save", "error");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">About Section Content</h3>
        <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Badge (e.g. ⊕ About Us)" className="w-full rounded border px-3 py-2 text-sm" />
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full rounded border px-3 py-2 text-sm" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full rounded border px-3 py-2 text-sm" rows={6} />
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="w-full rounded border px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} placeholder="CTA Text" className="flex-1 rounded border px-3 py-2 text-sm" />
          <input value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} placeholder="CTA Link" className="flex-1 rounded border px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">Save About Section</button>
      </div>
    </form>
  );
}
