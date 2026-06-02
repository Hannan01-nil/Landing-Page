import { HiArrowUpRight } from "react-icons/hi2";
import type { Match } from "@/data/types";
import { upcomingMatch } from "@/data/matches";

const sportColors: Record<string, string> = {
  football: "bg-[#edf7ff]",
  cricket: "bg-[#f0f7e6]",
  basketball: "bg-[#ffefe6]",
  tennis: "bg-[#e6f0f7]",
};

const sportEmoji: Record<string, string> = {
  football: "⚽",
  cricket: "🏏",
  basketball: "🏀",
  tennis: "🎾",
};

function MiniCrest({ label }: { label: string }) {
  return (
    <div className="grid size-14 place-items-center rounded-full bg-white text-[10px] font-black uppercase text-[#0b1b2a] ring-1 ring-[#cdddeb]">
      {label.slice(0, 2)}
    </div>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = upcomingMatch;
  const items = [
    [`${days}`, "Days"],
    [`${hours}`.padStart(2, "0"), "Hours"],
    [`${minutes}`.padStart(2, "0"), "Minute"],
    [`${seconds}`.padStart(2, "0"), "Seconds"],
  ];

  return (
    <div className="ml-auto grid w-full max-w-[610px] grid-cols-[1fr_auto_auto_auto_auto] items-center bg-white px-4 py-4 shadow-[0_0_0_1px_rgba(11,27,42,0.04)] md:px-8 md:py-5">
      <div>
        <p className="display text-sm text-[#0b1b2a] md:text-base">Upcoming Match</p>
        <p className="text-[10px] text-[#9aa7b3] md:text-xs">{upcomingMatch.league}</p>
      </div>
      {items.map(([value, label]) => (
        <div key={label} className="min-w-12 text-center md:min-w-16">
          <p className="display text-lg md:text-2xl">{value}</p>
          <p className="text-[8px] text-[#9aa7b3] md:text-[10px]">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function Schedule({ matches }: { matches: Match[] }) {
  return (
    <section id="matches" className="page-grid bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr] lg:items-start lg:gap-10">
          <div className="flex items-end gap-7">
            <h2 className="display text-4xl leading-[0.95] text-[#0b1b2a] md:text-6xl">
              Khelo sporting info
              <br />
              and updates
            </h2>
            <a href="#news" className="thin-btn mb-2 hidden md:inline-flex">
              Explore All <HiArrowUpRight />
            </a>
          </div>
          <Countdown />
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {matches.map((match) => (
            <article key={`${match.league}-${match.homeTeam}`} className={`${sportColors[match.sport]} p-5 text-center md:p-7`}>
              <span className="text-lg md:text-2xl">{sportEmoji[match.sport]}</span>
              <h3 className="mt-1 text-xs font-bold md:text-sm">{match.league}</h3>
              <p className="mt-1 text-[10px] text-[#8b98a5] md:text-xs">{match.date}</p>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:mt-6 md:gap-5">
                <div className="grid justify-items-center gap-2">
                  <MiniCrest label={match.homeTeam} />
                  <p className="text-[11px] font-semibold md:text-sm">{match.homeTeam}</p>
                </div>
                <p className="display text-3xl md:text-5xl">{match.score}</p>
                <div className="grid justify-items-center gap-2">
                  <MiniCrest label={match.awayTeam} />
                  <p className="text-[11px] font-semibold md:text-sm">{match.awayTeam}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a href="#news" className="thin-btn mt-6 md:hidden">
          Explore All <HiArrowUpRight />
        </a>
      </div>
    </section>
  );
}
