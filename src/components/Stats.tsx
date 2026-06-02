import type { Stat } from "@/data/types";

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-wide grid gap-8 sm:grid-cols-2 md:gap-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="display text-3xl md:text-5xl">{stat.value}</p>
            <h3 className="display mt-2 text-lg md:mt-3 md:text-xl">{stat.label}</h3>
            <p className="mt-2 max-w-[190px] text-[12px] leading-5 text-[#8b98a5] md:text-sm md:leading-6">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
