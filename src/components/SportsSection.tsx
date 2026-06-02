"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineFire,
  HiOutlineTrophy,
  HiOutlineUsers,
  HiOutlineStar,
} from "react-icons/hi2";

const sports = [
  {
    name: "Football",
    image: "/images/football.jpg",
    icon: HiOutlineFire,
    description: "Join the beautiful game",
  },
  {
    name: "Cricket",
    image: "/images/cricket.jpg",
    icon: HiOutlineTrophy,
    description: "Master the pitch",
  },
  {
    name: "Basketball",
    image: "/images/basketball.jpg",
    icon: HiOutlineUsers,
    description: "Take the shot",
  },
  {
    name: "Tennis",
    image: "/images/tennis.jpg",
    icon: HiOutlineStar,
    description: "Feel the rally",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SportsSection() {
  return (
    <section id="sports" className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-600/20 border border-red-600/40 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Sports
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
              Game
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From the field to the court — we offer world-class facilities and
            coaching across multiple sports.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sports.map((sport) => {
            const Icon = sport.icon;
            return (
              <motion.div
                key={sport.name}
                variants={itemVariants}
                className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-red-600/30 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/30 to-transparent" />
                </div>
                <div className="relative p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                      <Icon className="text-red-500 text-lg" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {sport.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">{sport.description}</p>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-red-600/20 transition-all duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
