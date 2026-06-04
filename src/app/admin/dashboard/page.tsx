"use client";

import Link from "next/link";

const cards = [
  { label: "Matches", href: "/admin/matches", desc: "Manage match schedule and results" },
  { label: "Upcoming Match", href: "/admin/upcoming-match", desc: "Edit upcoming match countdown" },
  { label: "Videos", href: "/admin/videos", desc: "Manage video list" },
  { label: "Featured Video", href: "/admin/featured-video", desc: "Edit featured highlight video" },
  { label: "News", href: "/admin/news", desc: "Manage news articles" },
  { label: "Stats", href: "/admin/stats", desc: "Manage statistics" },
  { label: "Products", href: "/admin/products", desc: "Manage product listings" },
  { label: "Hero", href: "/admin/hero", desc: "Edit hero section content" },
  { label: "About", href: "/admin/about", desc: "Edit about section content" },
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
