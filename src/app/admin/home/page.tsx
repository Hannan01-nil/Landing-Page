"use client";

import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

export default function HomePage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    badge: "Introducing\nKhelo\nSporting",
    badgeMobile: "Introducing Khelo Sporting",
    titleFirst: "S",
    titleMiddle: "portin",
    titleLast: "g",
    description: "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures.",
    ctaText: "Book A Ticket",
    ctaLink: "#matches",
    image: "/images/football.jpg",
  });

  async function fetchItem() {
    const res = await fetch("/api/hero");
    const data = await res.json();
    if (data) {
      setForm({
        badge: data.badge || "Introducing\nKhelo\nSporting",
        badgeMobile: data.badgeMobile || "Introducing Khelo Sporting",
        titleFirst: data.titleFirst || "S",
        titleMiddle: data.titleMiddle || "portin",
        titleLast: data.titleLast || "g",
        description: data.description || "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures.",
        ctaText: data.ctaText || "Book A Ticket",
        ctaLink: data.ctaLink || "#matches",
        image: data.image || "/images/football.jpg",
      });
    }
  }

  useEffect(() => { fetchItem(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) toast("Hero section saved!"); else toast("Failed to save", "error");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">Home Hero Section</h3>

        <label className="block text-xs text-gray-500">Badge Text (Desktop)</label>
        <textarea value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" rows={3} />

        <label className="block text-xs text-gray-500">Badge Text (Mobile)</label>
        <input value={form.badgeMobile} onChange={(e) => setForm({ ...form, badgeMobile: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />

        <label className="block text-xs text-gray-500">Large Heading</label>
        <div className="flex gap-2">
          <input value={form.titleFirst} onChange={(e) => setForm({ ...form, titleFirst: e.target.value })} placeholder="First" className="w-20 rounded border px-3 py-2 text-sm" />
          <input value={form.titleMiddle} onChange={(e) => setForm({ ...form, titleMiddle: e.target.value })} placeholder="Middle" className="flex-1 rounded border px-3 py-2 text-sm" />
          <input value={form.titleLast} onChange={(e) => setForm({ ...form, titleLast: e.target.value })} placeholder="Last" className="w-20 rounded border px-3 py-2 text-sm" />
        </div>

        <label className="block text-xs text-gray-500">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" rows={3} />

        <label className="block text-xs text-gray-500">Background Image</label>
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500">CTA Text</label>
            <input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500">CTA Link</label>
            <input value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
          </div>
        </div>

        <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">Save Home Section</button>
      </div>
    </form>
  );
}
