"use client";

import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";

interface UpcomingMatch {
  _id?: string;
  league: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function UpcomingMatchPage() {
  const [item, setItem] = useState<UpcomingMatch | null>(null);
  const [form, setForm] = useState({ league: "", days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showForm, setShowForm] = useState(false);

  async function fetchItem() {
    const res = await fetch("/api/upcoming-match");
    const data = await res.json();
    if (data) {
      setItem(data);
      setForm({ league: data.league, days: data.days, hours: data.hours, minutes: data.minutes, seconds: data.seconds });
    }
  }

  useEffect(() => { fetchItem(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/upcoming-match", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    fetchItem();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Single upcoming match entry</p>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1 rounded bg-[#0c1b2a] px-3 py-1.5 text-sm text-white"><HiPencil /> Edit</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="display text-xl mb-4">Edit Upcoming Match</h2>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="League" value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })} required className="col-span-2 rounded border px-3 py-2 text-sm" />
              <div><label className="block text-xs mb-1">Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Hours</label><input type="number" value={form.hours} onChange={(e) => setForm({ ...form, hours: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Minutes</label><input type="number" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs mb-1">Seconds</label><input type="number" value={form.seconds} onChange={(e) => setForm({ ...form, seconds: +e.target.value })} required className="w-full rounded border px-3 py-2 text-sm" /></div>
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
          <p><strong>League:</strong> {item.league}</p>
          <p><strong>Countdown:</strong> {item.days}d {item.hours}h {item.minutes}m {item.seconds}s</p>
        </div>
      )}
    </div>
  );
}
