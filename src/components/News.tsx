import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import type { NewsArticle } from "@/data/types";

export default function News({ articles }: { articles: NewsArticle[] }) {
  return (
    <section id="news" className="page-grid bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container-wide">
        <div className="flex items-center justify-between">
          <h2 className="display text-4xl leading-none md:text-6xl">Latest News</h2>
          <a href="#about" className="thin-btn">
            See All News <HiArrowUpRight />
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:gap-6 md:grid-cols-3">
          {articles.map((item) => (
            <article key={item.title} className="relative min-h-[260px] overflow-hidden bg-[#bfe1ff] p-6 md:min-h-[330px] md:p-8">
              {!item.plain && (
                <Image src={item.image} alt={item.title} fill sizes="33vw" className="object-cover" />
              )}
              <div className="absolute inset-0 bg-[#0b1b2a]/0" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex justify-between text-[10px] text-[#0b1b2a]/70 md:text-[11px]">
                  <span>{item.date}</span>
                  <span className="rounded-full border border-[#0b1b2a]/25 px-3 py-1">Admin</span>
                </div>
                <div className={item.plain ? "text-[#0b1b2a]" : "text-white"}>
                  <h3 className="display max-w-[200px] text-3xl leading-[0.95] md:max-w-[270px] md:text-5xl">
                    {item.title}
                  </h3>
                  <a href="#about" className="mt-6 grid size-8 place-items-center rounded-full border border-current md:mt-8 md:size-10">
                    <HiArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
