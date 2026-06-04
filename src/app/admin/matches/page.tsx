"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface Match {
  _id: string;
  league: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  sport: string;
}

const defaultForm = { league: "", date: "", homeTeam: "", awayTeam: "", score: "", sport: "football" };

export default function MatchesPage() {
  const [items, setItems] = useState<Match[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Match | null>(null);
  const [form, setForm] = useState(defaultForm);

  async function fetchItems() {
    const res = await fetch("/api/matches");
    setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  function openCreate() {
    setForm(defaultForm);
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(item: Match) {
    setForm({ league: item.league, date: item.date, homeTeam: item.homeTeam, awayTeam: item.awayTeam, score: item.score, sport: item.sport });
    setEditing(item);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/matches/${editing._id}` : "/api/matches";
    const method = editing ? "PUT" : "POST";

    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this match?")) return;
    await fetch(`/api/matches/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} matches</p>
        <button onClick={openCreate} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPlus /> Add Match</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">{editing ? "Edit Match" : "Add Match"}</h2>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="League" value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })} required className="col-span-2 rounded border px-3 py-2 text-sm" />
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
              <select value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })} className="rounded border px-3 py-2 text-sm">
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
              </select>
              <input placeholder="Home Team" value={form.homeTeam} onChange={(e) => setForm({ ...form, homeTeam: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
              <input placeholder="Away Team" value={form.awayTeam} onChange={(e) => setForm({ ...form, awayTeam: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
              <input placeholder="Score (e.g. 3-4)" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
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
              <th className="p-3 font-medium">League</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Home</th>
              <th className="p-3 font-medium">Score</th>
              <th className="p-3 font-medium">Away</th>
              <th className="p-3 font-medium">Sport</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.league}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.homeTeam}</td>
                <td className="p-3 font-semibold">{item.score}</td>
                <td className="p-3">{item.awayTeam}</td>
                <td className="p-3 capitalize">{item.sport}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-blue-600"><HiPencil /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-gray-400">No matches yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
