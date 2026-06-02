"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const players = [
  {
    name: "Alex Rivera",
    sport: "Football",
    stat: "32 Goals",
    image: "/images/player-1.jpg",
  },
  {
    name: "Sarah Chen",
    sport: "Tennis",
    stat: "15 Titles",
    image: "/images/player-2.jpg",
  },
  {
    name: "Marcus Johnson",
    sport: "Basketball",
    stat: "28 PPG",
    image: "/images/player-3.jpg",
  },
];

export default function Players() {
  return (
    <section id="players" className="py-20 lg:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-600/20 border border-red-600/40 rounded-full text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Featured Athletes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
              Star Players
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Elite athletes pushing boundaries and inspiring the next generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  {player.sport}
                </span>
                <h3 className="text-xl font-bold text-white">{player.name}</h3>
                <div className="mt-2 inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <span className="text-sm font-semibold text-amber-400">
                    {player.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
