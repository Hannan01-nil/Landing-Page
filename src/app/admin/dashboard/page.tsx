"use client";

import Link from "next/link";

const cards = [
  { label: "Home", href: "/admin/home", desc: "Edit hero section content" },
  { label: "Matches", href: "/admin/matches", desc: "Manage match schedule and upcoming match" },
  { label: "Highlighted Match", href: "/admin/highlight-match", desc: "Manage videos and section settings" },
  { label: "Latest News", href: "/admin/news", desc: "Manage news articles" },
  { label: "About", href: "/admin/about", desc: "Edit about section content" },
  { label: "Stats", href: "/admin/stats", desc: "Manage statistics" },
  { label: "Products", href: "/admin/products", desc: "Manage product listings" },
  { label: "Subscribe", href: "/admin/subscribers", desc: "View subscribers and edit form" },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="display text-lg mb-1">{card.label}</h3>
          <p className="text-sm text-gray-500">{card.desc}</p>
        </Link>
      ))}
    </div>
  );
}
