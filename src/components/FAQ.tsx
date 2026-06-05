"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
}

export default function FAQ({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-wide">
        <h2 className="display text-center text-4xl leading-none md:text-6xl">Frequently Asked Questions</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-14">
          {faqs.map((faq) => {
            const isOpen = openId === faq._id;
            return (
              <div key={faq._id} className="rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : faq._id || null)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold md:text-base"
                >
                  {faq.question}
                  <HiChevronDown className={`text-lg transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="border-t border-gray-200 px-5 py-4 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
