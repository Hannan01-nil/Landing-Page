"use client";

import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const { toast, confirm } = useToast();
  const [items, setItems] = useState<Subscriber[]>([]);
  const [section, setSection] = useState({ title: "Subscribe to our newsletter", placeholder: "Enter your email", buttonText: "Subscribe" });

  async function fetchAll() {
    const [subRes, setRes] = await Promise.all([fetch("/api/subscribers"), fetch("/api/subscribe-section")]);
    setItems(await subRes.json());
    const sData = await setRes.json();
    if (sData) setSection({ title: sData.title || "Subscribe to our newsletter", placeholder: sData.placeholder || "Enter your email", buttonText: sData.buttonText || "Subscribe" });
  }

  useEffect(() => { fetchAll(); }, []);

  async function saveSection() {
    const res = await fetch("/api/subscribe-section", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(section) });
    if (res.ok) toast("Section settings saved!"); else toast("Failed to save", "error");
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Delete this subscriber?"))) return;
    await fetch("/api/subscribers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-white p-4 space-y-3">
        <h3 className="font-semibold">Section Settings</h3>
        <input value={section.title} onChange={(e) => setSection({ ...section, title: e.target.value })} placeholder="Title" className="w-full rounded border px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <input value={section.placeholder} onChange={(e) => setSection({ ...section, placeholder: e.target.value })} placeholder="Input Placeholder" className="flex-1 rounded border px-3 py-2 text-sm" />
          <input value={section.buttonText} onChange={(e) => setSection({ ...section, buttonText: e.target.value })} placeholder="Button Text" className="flex-1 rounded border px-3 py-2 text-sm" />
        </div>
        <button onClick={saveSection} className="rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">Save Settings</button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Subscribed At</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.email}</td>
                <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(item._id)} className="text-red-600"><HiTrash /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={3} className="p-6 text-center text-gray-400">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
