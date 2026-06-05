"use client";

import { useEffect, useState } from "react";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi2";
import { useToast } from "@/components/Toast";

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  order: number;
}

export default function FaqAdminPage() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [modal, setModal] = useState<{ open: boolean; edit?: FaqItem }>({ open: false });

  async function fetchFaqs() {
    const res = await fetch("/api/faq");
    const data = await res.json();
    setFaqs(data || []);
  }

  useEffect(() => { fetchFaqs(); }, []);

  async function handleSave(item: FaqItem) {
    const url = item._id ? `/api/faq/${item._id}` : "/api/faq";
    const method = item._id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: item.question, answer: item.answer, order: item.order }),
    });
    if (res.ok) {
      toast(item._id ? "FAQ updated!" : "FAQ created!");
      setModal({ open: false });
      fetchFaqs();
    } else {
      toast("Failed to save", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast("FAQ deleted!");
      fetchFaqs();
    } else {
      toast("Failed to delete", "error");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{faqs.length} FAQ(s)</p>
        <button onClick={() => setModal({ open: true, edit: { question: "", answer: "", order: faqs.length } })} className="flex items-center gap-2 rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">
          <HiPlus /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-400">No FAQs yet. Click "Add FAQ" to create one.</div>
      )}

      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq._id} className="flex items-start justify-between rounded-lg border bg-white p-4">
            <div className="flex-1">
              <p className="font-semibold text-sm">{faq.question}</p>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => setModal({ open: true, edit: faq })} className="rounded p-2 text-gray-500 hover:bg-gray-100"><HiPencil /></button>
              <button onClick={() => faq._id && handleDelete(faq._id)} className="rounded p-2 text-red-500 hover:bg-red-50"><HiTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {modal.open && (
        <FaqModal
          item={modal.edit!}
          onSave={handleSave}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
}

function FaqModal({ item, onSave, onClose }: { item: FaqItem; onSave: (item: FaqItem) => void; onClose: () => void }) {
  const [form, setForm] = useState(item);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-lg rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">{item._id ? "Edit FAQ" : "Add FAQ"}</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">Question</label>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Answer</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Order</label>
            <input value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} type="number" className="w-full rounded border px-3 py-2 text-sm outline-none focus:border-[#0c1b2a]" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded border px-4 py-2 text-sm">Cancel</button>
          <button onClick={() => onSave(form)} className="rounded bg-[#0c1b2a] px-4 py-2 text-sm text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
