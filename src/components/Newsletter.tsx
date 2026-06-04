"use client";

import { HiArrowUpRight } from "react-icons/hi2";
import { useState } from "react";

interface NewsletterProps {
  title?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function Newsletter({
  title = "Subscribe to our newsletter",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  async function handleSubscribe() {
    if (!email) return;
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-6 border-b border-white/25 pb-8 md:flex-row md:items-center md:justify-between md:gap-7 md:pb-10">
      <h2 className="display text-3xl leading-none md:text-5xl">
        {title}
      </h2>
      <div className="flex w-full max-w-xl bg-white">
        <label className="sr-only" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          suppressHydrationWarning
          className="h-10 flex-1 px-4 text-[12px] text-[#0b1b2a] outline-none md:h-12 md:px-5 md:text-sm"
        />
        <button
          type="button"
          onClick={handleSubscribe}
          suppressHydrationWarning
          className="flex h-10 items-center gap-2 bg-[#0b1b2a] px-4 text-[11px] font-bold text-white md:h-12 md:gap-3 md:px-6 md:text-sm"
        >
          {buttonText} <span className="hidden md:inline">|</span> <HiArrowUpRight />
        </button>
      </div>
    </div>
  );
}
