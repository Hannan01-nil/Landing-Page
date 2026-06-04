"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface NewsArticle {
  _id: string;
  title: string;
  image: string;
  date: string;
  plain?: boolean;
}

const defaultForm = { title: "", image: "", date: "", plain: false };

export default function NewsPage() {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [form, setForm] = useState(defaultForm);

  async function fetchItems() {
    const res = await fetch("/api/news");
    setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  function openCreate() { setForm(defaultForm); setEditing(null); setShowForm(true); }
  function openEdit(item: NewsArticle) { setForm({ title: item.title, image: item.image, date: item.date, plain: item.plain || false }); setEditing(item); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/news/${editing._id}` : "/api/news";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} articles</p>
        <button onClick={openCreate} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPlus /> Add Article</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">{editing ? "Edit Article" : "Add Article"}</h2>
            <div className="space-y-3">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="Date (e.g. May 25, 2019)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.plain} onChange={(e) => setForm({ ...form, plain: e.target.checked })} />
                Plain style (no image overlay)
              </label>
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
              <th className="p-3 font-medium">Plain</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 max-w-[250px] truncate">{item.title}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.plain ? "Yes" : "No"}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-blue-600"><HiPencil /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-400">No articles yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
