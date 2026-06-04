"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface Video {
  _id: string;
  title: string;
  publishedDate: string;
  duration: string;
  thumbnail: string;
}

const defaultForm = { title: "", publishedDate: "", duration: "", thumbnail: "" };

export default function VideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [form, setForm] = useState(defaultForm);

  async function fetchItems() {
    const res = await fetch("/api/videos");
    setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  function openCreate() { setForm(defaultForm); setEditing(null); setShowForm(true); }
  function openEdit(item: Video) { setForm({ title: item.title, publishedDate: item.publishedDate, duration: item.duration, thumbnail: item.thumbnail }); setEditing(item); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/videos/${editing._id}` : "/api/videos";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
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
              <th className="p-3 font-medium">Thumbnail</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 max-w-[200px] truncate">{item.title}</td>
                <td className="p-3">{item.publishedDate}</td>
                <td className="p-3">{item.duration}</td>
                <td className="p-3 max-w-[120px] truncate">{item.thumbnail}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-blue-600"><HiPencil /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-400">No videos yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
