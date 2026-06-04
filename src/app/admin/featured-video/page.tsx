"use client";

import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";

interface FeaturedVideo {
  _id?: string;
  image: string;
  alt: string;
}

export default function FeaturedVideoPage() {
  const [item, setItem] = useState<FeaturedVideo | null>(null);
  const [form, setForm] = useState({ image: "", alt: "" });
  const [showForm, setShowForm] = useState(false);

  async function fetchItem() {
    const res = await fetch("/api/featured-video");
    const data = await res.json();
    if (data) { setItem(data); setForm({ image: data.image, alt: data.alt }); }
  }

  useEffect(() => { fetchItem(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/featured-video", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItem();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Single featured video entry</p>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPencil /> Edit</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">Edit Featured Video</h2>
            <div className="space-y-3">
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="Alt Text" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="rounded border px-4 py-1.5 text-sm">Cancel</button>
              <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-1.5 text-sm text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {item && (
        <div className="rounded-lg border bg-white p-6">
          <p><strong>Image:</strong> {item.image}</p>
          <p><strong>Alt:</strong> {item.alt}</p>
        </div>
      )}
    </div>
  );
}
