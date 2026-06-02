"use client";

import { motion } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const matches = [
  {
    team1: "Khelo United",
    team2: "City Strikers",
    sport: "Football",
    date: "June 15, 2026",
    time: "7:00 PM",
    venue: "Khelo Main Stadium",
    score: "3 - 2",
  },
  {
    team1: "Khelo Tigers",
    team2: "Royal Challengers",
    sport: "Cricket",
    date: "June 18, 2026",
    time: "4:00 PM",
    venue: "Cricket Ground A",
    score: "185/4",
  },
  {
    team1: "Khelo Hawks",
    team2: "Valley Ballers",
    sport: "Basketball",
    date: "June 20, 2026",
    time: "8:00 PM",
    venue: "Indoor Arena",
    score: "98 - 87",
  },
  {
    team1: "Khelo Aces",
    team2: "Net Warriors",
    sport: "Tennis",
    date: "June 22, 2026",
    time: "5:00 PM",
    venue: "Tennis Complex",
    score: "6-3, 7-5",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 lg:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Upcoming Matches
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Match{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
              Fixtures
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Catch the latest action live. Check schedules, scores, and venues
            for upcoming matches.
          </p>
        </motion.div>

        <div className="space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#1a1a1a] border border-white/5 hover:border-red-600/30 rounded-xl p-5 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                    {match.sport}
                  </span>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-bold text-white">
                      {match.team1}
                    </span>
                    <span className="text-sm font-bold text-amber-500">VS</span>
                    <span className="text-lg font-bold text-white">
                      {match.team2}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <HiOutlineCalendar className="text-red-500" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineClock className="text-amber-500" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineLocationMarker className="text-red-500" />
                    <span className="text-xs">{match.venue}</span>
                  </div>
                </div>

                <div className="lg:text-right">
                  <div className="px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-lg">
                    <span className="text-lg font-bold text-amber-400">
                      {match.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
