"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface Stat {
  _id: string;
  value: string;
  label: string;
  description: string;
}

const defaultForm = { value: "", label: "", description: "" };

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Stat | null>(null);
  const [form, setForm] = useState(defaultForm);

  async function fetchItems() {
    const res = await fetch("/api/stats");
    setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  function openCreate() { setForm(defaultForm); setEditing(null); setShowForm(true); }
  function openEdit(item: Stat) { setForm({ value: item.value, label: item.label, description: item.description }); setEditing(item); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/stats/${editing._id}` : "/api/stats";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this stat?")) return;
    await fetch(`/api/stats/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} stats</p>
        <button onClick={openCreate} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPlus /> Add Stat</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">{editing ? "Edit Stat" : "Add Stat"}</h2>
            <div className="space-y-3">
              <input placeholder="Value (e.g. 350+)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <input placeholder="Label (e.g. Total Matches)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" rows={3} />
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
              <th className="p-3 font-medium">Value</th>
              <th className="p-3 font-medium">Label</th>
              <th className="p-3 font-medium">Description</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 font-semibold">{item.value}</td>
                <td className="p-3">{item.label}</td>
                <td className="p-3 max-w-[300px] truncate">{item.description}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-blue-600"><HiPencil /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-400">No stats yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
