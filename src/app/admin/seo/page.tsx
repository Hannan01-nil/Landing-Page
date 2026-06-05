"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

const routes = [
  { route: "/", label: "Home" },
  { route: "/matches", label: "Matches" },
  { route: "/videos", label: "Highlights" },
  { route: "/news", label: "News" },
  { route: "/about", label: "About" },
  { route: "/stats", label: "Stats" },
  { route: "/products", label: "Products" },
  { route: "/subscribe", label: "Subscribe" },
];

interface SeoEntry {
  route: string;
  title: string;
  description: string;
  ogImage: string;
}

export default function SeoAdminPage() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<SeoEntry[]>(routes.map(r => ({ route: r.route, title: "", description: "", ogImage: "" })));

  async function fetchSeo() {
    const res = await fetch("/api/seo");
    const data = await res.json();
    if (data?.entries) setEntries(data.entries);
  }

  useEffect(() => { fetchSeo(); }, []);

  function updateEntry(route: string, field: keyof SeoEntry, value: string) {
    setEntries(prev => prev.map(e => e.route === route ? { ...e, [field]: value } : e));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries }),
    });
    if (res.ok) toast("SEO settings saved!");
    else toast("Failed to save", "error");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Set title, meta description, and OG image for each page.</p>
        <button type="submit" className="rounded bg-[#0c1b2a] px-5 py-2 text-sm text-white">Save All</button>
      </div>

      {routes.map(({ route, label }) => {
        const entry = entries.find(e => e.route === route);
        return (
          <div key={route} className="rounded-lg border bg-white p-4 space-y-3">
            <h3 className="font-semibold text-sm text-gray-800">{label} <span className="font-mono text-gray-400">({route})</span></h3>
            <div>
              <label className="text-xs text-gray-500">Title</label>
              <input
                value={entry?.title || ""}
                onChange={(e) => updateEntry(route, "title", e.target.value)}
                placeholder={`${label} - Khelo Sporting Club`}
                className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                value={entry?.description || ""}
                onChange={(e) => updateEntry(route, "description", e.target.value)}
                rows={2}
                placeholder="Meta description for this page..."
                className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">OG Image URL</label>
              <input
                value={entry?.ogImage || ""}
                onChange={(e) => updateEntry(route, "ogImage", e.target.value)}
                placeholder="/khelo.png"
                className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]"
              />
            </div>
          </div>
        );
      })}

      <div className="flex justify-end">
        <button type="submit" className="rounded bg-[#0c1b2a] px-5 py-2 text-sm text-white">Save All</button>
      </div>
    </form>
  );
}
