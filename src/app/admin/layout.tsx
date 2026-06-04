"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiArrowLeftOnRectangle, HiBars3, HiXMark } from "react-icons/hi2";
import { ToastProvider } from "@/components/Toast";

const sections = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Home", href: "/admin/home" },
  { label: "Matches", href: "/admin/matches" },
  { label: "Highlighted Match", href: "/admin/highlight-match" },
  { label: "Latest News", href: "/admin/news" },
  { label: "About", href: "/admin/about" },
  { label: "Stats", href: "/admin/stats" },
  { label: "Products", href: "/admin/products" },
  { label: "Subscribe", href: "/admin/subscribers" },
];

function AdminLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <ToastProvider>{children}</ToastProvider>;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return <ToastProvider>
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0c1b2a] text-white transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link href="/admin/dashboard" className="display text-2xl">Khelo CMS</Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <HiXMark className="text-xl" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`block rounded px-3 py-2 text-sm transition-colors ${pathname === s.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <HiArrowLeftOnRectangle /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <HiBars3 className="text-xl" />
          </button>
          <h1 className="display text-xl capitalize">{pathname.replace("/admin/", "").replace(/-/g, " ")}</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  </ToastProvider>;
}

export default AdminLayoutInner;
