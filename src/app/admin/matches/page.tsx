"use client";

import { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

interface Match {
  _id: string;
  league: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  sport: string;
}

interface UpcomingMatch {
  _id?: string;
  league: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const defaultForm = { league: "", date: "", homeTeam: "", awayTeam: "", score: "", sport: "football" };
const defaultUpcoming = { league: "", days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function MatchesPage() {
  const { toast, confirm } = useToast();
  const [items, setItems] = useState<Match[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Match | null>(null);
  const [form, setForm] = useState(defaultForm);

  const [sectionTitle, setSectionTitle] = useState("Khelo sporting info\nand updates");
  const [upcoming, setUpcoming] = useState<UpcomingMatch | null>(null);
  const [upForm, setUpForm] = useState(defaultUpcoming);
  const [showUpcoming, setShowUpcoming] = useState(false);

  async function fetchItems() {
    const [mRes, sRes, uRes] = await Promise.all([
      fetch("/api/matches"),
      fetch("/api/match-section"),
      fetch("/api/upcoming-match"),
    ]);
    setItems(await mRes.json());
    const sData = await sRes.json();
    if (sData?.title) setSectionTitle(sData.title);
    const uData = await uRes.json();
    if (uData) { setUpcoming(uData); setUpForm({ league: uData.league, days: uData.days, hours: uData.hours, minutes: uData.minutes, seconds: uData.seconds }); }
  }

  useEffect(() => { fetchItems(); }, []);

  async function saveSectionTitle() {
    const res = await fetch("/api/match-section", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: sectionTitle }) });
    if (res.ok) toast("Section title saved!"); else toast("Failed to save", "error");
  }

  async function saveUpcoming(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/upcoming-match", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(upForm) });
    setShowUpcoming(false);
    fetchItems();
  }

  function openCreate() { setForm(defaultForm); setEditing(null); setShowForm(true); }
  function openEdit(item: Match) { setForm({ league: item.league, date: item.date, homeTeam: item.homeTeam, awayTeam: item.awayTeam, score: item.score, sport: item.sport }); setEditing(item); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/matches/${editing._id}` : "/api/matches";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Delete this match?"))) return;
    await fetch(`/api/matches/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="rounded-lg border bg-white p-4">
        <label className="block text-sm font-medium mb-1">Section Title</label>
        <div className="flex gap-2">
          <input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} className="flex-1 rounded border px-3 py-2 text-sm" />
          <button onClick={saveSectionTitle} className="rounded bg-[#0c1b2a] px-4 text-sm text-white">Save Title</button>
        </div>
      </div>

      {/* Upcoming Match */}
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Upcoming Match Countdown</h3>
          <button onClick={() => setShowUpcoming(true)} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPencil /> Edit</button>
        </div>
        {upcoming && (
          <p className="text-sm text-gray-600">{upcoming.league} — {upcoming.days}d {upcoming.hours}h {upcoming.minutes}m {upcoming.seconds}s</p>
        )}
      </div>

      {showUpcoming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowUpcoming(false)}>
          <form onSubmit={saveUpcoming} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">Edit Upcoming Match</h2>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="League" value={upForm.league} onChange={(e) => setUpForm({ ...upForm, league: e.target.value })} required className="col-span-2 rounded border px-3 py-2 text-sm" />
              <div><label className="block text-xs mb-1">Days</label><input type="number" value={upForm.days} onChange={(e) => setUpForm({ ...upForm, days: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Hours</label><input type="number" value={upForm.hours} onChange={(e) => setUpForm({ ...upForm, hours: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Minutes</label><input type="number" value={upForm.minutes} onChange={(e) => setUpForm({ ...upForm, minutes: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Seconds</label><input type="number" value={upForm.seconds} onChange={(e) => setUpForm({ ...upForm, seconds: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button type="button" onClick={() => setShowUpcoming(false)} className="rounded border px-4 py-1.5 text-sm">Cancel</button>
              <button type="submit" className="rounded bg-[#0c1b2a] px-4 py-1.5 text-sm text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Matches Table */}
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
                <input placeholder="Score (e.g. 3-4)" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required className="col-span-2 rounded border px-3 py-2 text-sm" />
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
    </div>
  );
}
