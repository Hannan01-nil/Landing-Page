"use client";

import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";

export default function Newsletter() {
  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-900/40 via-[#1a1a1a] to-amber-900/40 border border-white/5 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-red-600/20 flex items-center justify-center">
              <HiOutlineMail className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Stay in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                Loop
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest match updates, event invitations, and exclusive
              content delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
