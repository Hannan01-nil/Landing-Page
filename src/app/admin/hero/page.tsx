"use client";

import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";

interface Hero {
  _id?: string;
  heading: string;
  subheading?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroPage() {
  const [item, setItem] = useState<Hero | null>(null);
  const [form, setForm] = useState({ heading: "", subheading: "", description: "", ctaText: "", ctaLink: "" });
  const [showForm, setShowForm] = useState(false);

  async function fetchItem() {
    const res = await fetch("/api/hero");
    const data = await res.json();
    if (data) { setItem(data); setForm({ heading: data.heading || "", subheading: data.subheading || "", description: data.description || "", ctaText: data.ctaText || "", ctaLink: data.ctaLink || "" }); }
  }

  useEffect(() => { fetchItem(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItem();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Single hero section entry</p>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPencil /> Edit</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">Edit Hero</h2>
            <div className="space-y-3">
              <input placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="Subheading" value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" rows={3} />
              <input placeholder="CTA Text" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="CTA Link" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} className="w-full rounded border px-3 py-2 text-sm" />
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="rounded border px-4 py-1.5 text-sm">Cancel</button>
              <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-1.5 text-sm text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {item && (
        <div className="rounded-lg border bg-white p-6 space-y-2">
          <p><strong>Heading:</strong> {item.heading}</p>
          <p><strong>Subheading:</strong> {item.subheading || "-"}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>CTA:</strong> {item.ctaText || "-"} → {item.ctaLink || "-"}</p>
        </div>
      )}
    </div>
  );
}
