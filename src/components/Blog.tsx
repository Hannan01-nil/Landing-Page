"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

const posts = [
  {
    title: "Khelo United Clinches Championship Title",
    excerpt: "A thrilling final saw Khelo United take home the trophy in a nail-biting finish.",
    date: "June 10, 2026",
    image: "/images/blog-1.jpg",
    category: "Match Report",
  },
  {
    title: "New Training Facility Now Open",
    excerpt: "State-of-the-art training center launched with cutting-edge equipment and coaching.",
    date: "June 5, 2026",
    image: "/images/blog-2.jpg",
    category: "Club News",
  },
  {
    title: "Junior Sports Camp Registration Open",
    excerpt: "Summer camp for young athletes — register now for an unforgettable experience.",
    date: "June 1, 2026",
    image: "/images/blog-3.jpg",
    category: "Events",
  },
];

export default function Blog() {
  return (
    <section id="news" className="py-20 lg:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Latest News
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sports{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
              News & Updates
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay informed with the latest happenings, match reports, and club
            announcements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-red-600/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">{post.date}</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-red-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
                >
                  Read More
                  <HiArrowRight className="text-xs" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
