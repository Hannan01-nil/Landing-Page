"use client";

import { useState } from "react";
import { HiBars3, HiMagnifyingGlass, HiShoppingCart, HiXMark } from "react-icons/hi2";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Matches", href: "#matches" },
  { label: "News", href: "#news" },
  { label: "About", href: "#about" },
  { label: "Subscribe", href: "#subscribe" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20 bg-[#0b1b2a]/95 backdrop-blur-sm">
        <div className="container-wide flex h-full items-center justify-between">
          <a href="#home" className="display text-4xl leading-none text-white md:text-5xl">
            K
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <button
                aria-label="Search"
                suppressHydrationWarning
                className="grid size-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
              >
                <HiMagnifyingGlass className="text-sm" />
              </button>
              <button
                aria-label="Cart"
                suppressHydrationWarning
                className="grid size-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
              >
                <HiShoppingCart className="text-sm" />
              </button>
            </div>
            <button
              aria-label="Open menu"
              suppressHydrationWarning
              className="grid size-9 place-items-center rounded-full bg-white text-[#0b1b2a] transition-colors hover:bg-white/90 md:hidden"
              onClick={() => setOpen(true)}
            >
              <HiBars3 className="text-sm" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0b1b2a] text-white md:hidden">
          <div className="flex h-20 items-center justify-between px-7">
            <a
              href="#home"
              className="display text-4xl leading-none"
              onClick={() => setOpen(false)}
            >
              K
            </a>
            <button
              aria-label="Close menu"
              suppressHydrationWarning
              className="grid size-9 place-items-center rounded-full bg-white text-[#0b1b2a]"
              onClick={() => setOpen(false)}
            >
              <HiXMark className="text-sm" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-3xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="display transition-colors hover:text-white/60"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
