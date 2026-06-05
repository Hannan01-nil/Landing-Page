"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

interface GeoForm {
  name: string;
  description: string;
  logo: string;
  url: string;
  foundingYear: string;
  sameAs: string[];
}

export default function GeoAdminPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<GeoForm>({
    name: "Khelo Sporting Club",
    description: "",
    logo: "/khelo.png",
    url: "",
    foundingYear: "",
    sameAs: ["", "", ""],
  });

  async function fetchGeo() {
    const res = await fetch("/api/geo");
    const data = await res.json();
    if (data) {
      setForm({
        name: data.name || "Khelo Sporting Club",
        description: data.description || "",
        logo: data.logo || "/khelo.png",
        url: data.url || "",
        foundingYear: data.foundingYear?.toString() || "",
        sameAs: data.sameAs?.length ? data.sameAs : ["", "", ""],
      });
    }
  }

  useEffect(() => { fetchGeo(); }, []);

  function update(field: keyof GeoForm, value: string | string[]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function updateSocial(index: number, value: string) {
    const updated = [...form.sameAs];
    updated[index] = value;
    update("sameAs", updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      ...form,
      foundingYear: form.foundingYear ? Number(form.foundingYear) : undefined,
      sameAs: form.sameAs.filter(Boolean),
    };
    const res = await fetch("/api/geo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) toast("GEO settings saved!");
    else toast("Failed to save", "error");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <p className="text-sm text-gray-500">This data generates JSON-LD structured data for search engines and AI tools.</p>

      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">Organization Info</h3>
        <div>
          <label className="text-xs text-gray-500">Organization Name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Description</label>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Logo URL</label>
          <input value={form.logo} onChange={(e) => update("logo", e.target.value)} className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Website URL</label>
          <input value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://khelo.com" className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Founding Year</label>
          <input value={form.foundingYear} onChange={(e) => update("foundingYear", e.target.value)} type="number" className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">Social Profiles (sameAs)</h3>
        {form.sameAs.map((url, i) => (
          <div key={i}>
            <label className="text-xs text-gray-500">Social Link {i + 1}</label>
            <input value={url} onChange={(e) => updateSocial(i, e.target.value)} placeholder="https://facebook.com/khelo" className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
          </div>
        ))}
      </div>

      <button type="submit" className="rounded bg-[#0c1b2a] px-5 py-2 text-sm text-white">Save GEO Settings</button>
    </form>
  );
}
