"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineCalendar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const stats = [
  { label: "Active Players", value: 2500, suffix: "+", icon: HiOutlineUserGroup },
  { label: "Championships Won", value: 48, suffix: "", icon: HiOutlineTrophy },
  { label: "Matches Played", value: 1200, suffix: "+", icon: HiOutlineCalendar },
  { label: "Global Reach", value: 15, suffix: " Countries", icon: HiOutlineGlobeAlt },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = to / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-900/20 via-[#0a0a0a] to-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Khelo by the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
              Numbers
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our growing community of athletes, champions, and sports
            enthusiasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-[#1a1a1a] border border-white/5"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-red-600/20 flex items-center justify-center">
                  <Icon className="text-red-500 text-xl" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
