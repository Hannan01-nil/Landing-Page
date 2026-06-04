"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

interface Video {
  _id: string;
  title: string;
  publishedDate: string;
  duration: string;
  thumbnail: string;
}

const defaultForm = { title: "", publishedDate: "", duration: "", thumbnail: "" };

export default function HighlightedMatchPage() {
  const { toast, confirm } = useToast();
  const [items, setItems] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [form, setForm] = useState(defaultForm);

  const [section, setSection] = useState({ title: "Highlighted Match", description: "", featuredImage: "/images/blog-1.jpg", featuredAlt: "Highlighted match" });

  async function fetchAll() {
    const [vRes, sRes] = await Promise.all([fetch("/api/videos"), fetch("/api/highlight-section")]);
    setItems(await vRes.json());
    const sData = await sRes.json();
    if (sData) setSection({ title: sData.title || "Highlighted Match", description: sData.description || "", featuredImage: sData.featuredImage || "/images/blog-1.jpg", featuredAlt: sData.featuredAlt || "Highlighted match" });
  }

  useEffect(() => { fetchAll(); }, []);

  async function saveSection() {
    const res = await fetch("/api/highlight-section", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(section) });
    if (res.ok) toast("Section settings saved!"); else toast("Failed to save", "error");
  }

  function openCreate() { setForm(defaultForm); setEditing(null); setShowForm(true); }
  function openEdit(item: Video) { setForm({ title: item.title, publishedDate: item.publishedDate, duration: item.duration, thumbnail: item.thumbnail }); setEditing(item); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/videos/${editing._id}` : "/api/videos";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchAll();
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Delete this video?"))) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    fetchAll();
  }

  return (
    <div className="space-y-8">
      {/* Section Settings */}
      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">Section Settings</h3>
        <input value={section.title} onChange={(e) => setSection({ ...section, title: e.target.value })} placeholder="Section Title" className="w-full rounded border px-3 py-2 text-sm" />
        <textarea value={section.description} onChange={(e) => setSection({ ...section, description: e.target.value })} placeholder="Section Description" className="w-full rounded border px-3 py-2 text-sm" rows={2} />
        <input value={section.featuredImage} onChange={(e) => setSection({ ...section, featuredImage: e.target.value })} placeholder="Featured Image URL" className="w-full rounded border px-3 py-2 text-sm" />
        <input value={section.featuredAlt} onChange={(e) => setSection({ ...section, featuredAlt: e.target.value })} placeholder="Featured Image Alt Text" className="w-full rounded border px-3 py-2 text-sm" />
        <button onClick={saveSection} className="rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">Save Settings</button>
      </div>

      {/* Videos Table */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">{items.length} videos</p>
          <button onClick={openCreate} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPlus /> Add Video</button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="display text-xl mb-4">{editing ? "Edit Video" : "Add Video"}</h2>
              <div className="space-y-3">
                <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
                <input placeholder="Published Date" value={form.publishedDate} onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
                <input placeholder="Duration (e.g. 2:35 Mins)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
                <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="rounded border px-4 py-1.5 text-sm">Cancel</button>
                <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-1.5 text-sm text-white">Save</button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 font-medium">Title</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Duration</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3 max-w-[250px] truncate">{item.title}</td>
                  <td className="p-3">{item.publishedDate}</td>
                  <td className="p-3">{item.duration}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="text-blue-600"><HiPencil /></button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-gray-400">No videos yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
