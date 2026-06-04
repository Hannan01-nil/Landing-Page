import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaFacebookF, FaFutbol, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface HeroProps {
  badge?: string;
  badgeMobile?: string;
  titleFirst?: string;
  titleMiddle?: string;
  titleLast?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

export default function Hero({
  badge = "Introducing\nKhelo\nSporting",
  badgeMobile = "Introducing Khelo Sporting",
  titleFirst = "S",
  titleMiddle = "portin",
  titleLast = "g",
  description = "We vehemently condemn and disapprove of individuals who are swayed and demoralized by the allure of momentary pleasures.",
  ctaText = "Book A Ticket",
  ctaLink = "#matches",
  image = "/images/football.jpg",
}: HeroProps) {
  const badgeLines = badge.split("\n");
  return (
    <section
      id="home"
      className="hero-grid relative min-h-[820px] overflow-hidden bg-[#0b1b2a] text-white scroll-mt-20"
    >
      <div className="container-wide relative z-10 flex min-h-[820px] items-center">
        <div className="absolute left-[9%] top-[24%] z-20 hidden md:block">
          <p className="display text-2xl leading-[0.95]">
            {badgeLines.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
        </div>

        <div className="absolute left-1/2 top-[15%] z-20 text-center md:hidden">
          <p className="display text-lg leading-[0.95]">
            {badgeMobile}
          </p>
        </div>

        <h1
          className="display pointer-events-none absolute left-1/2 top-[44%] z-10 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[max(4.5rem,18vw)] leading-none opacity-95"
          style={{ textShadow: "0 26px 70px rgba(0,0,0,0.35)" }}
        >
          <span className="text-white">{titleFirst}</span>
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.82)" }}
          >
            {titleMiddle}
          </span>
          <span className="text-white">{titleLast}</span>
        </h1>

        <div className="absolute left-[24%] top-[15%] z-20 h-[300px] w-[52%] md:h-[600px]">
          <div className="relative h-full w-full opacity-75 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.72)_66%,transparent_88%)]">
            <Image
              src={image}
              alt="Football action"
              fill
              priority
              sizes="70vw"
              className="object-contain brightness-125 contrast-125 saturate-90 drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div className="absolute -left-4 top-[70%] z-30 grid size-16 -translate-y-1/2 place-items-center rounded-full bg-white text-3xl shadow-2xl md:-left-6 md:size-28 md:text-5xl">
            <FaFutbol className="text-[#2e6dff]" />
          </div>
        </div>

        <h1
          className="display pointer-events-none absolute left-1/2 top-[44%] z-30 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[max(4.5rem,18vw)] leading-none text-white/5 mix-blend-screen"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
        >
          <span className="text-white/35">{titleFirst}</span>
          <span className="text-transparent">{titleMiddle}</span>
          <span className="text-white/35">{titleLast}</span>
        </h1>

        <div className="absolute bottom-[15%] right-[5%] z-20 max-w-[180px] md:right-[24%] md:max-w-xs">
          <p className="text-[10px] leading-4 text-white/52 md:text-[12px] md:leading-5">
            {description}
          </p>
          <a
            href={ctaLink}
            className="mt-4 inline-flex items-center gap-3 text-xs font-bold text-white md:mt-7 md:text-sm"
          >
            {ctaText} <HiArrowUpRight />
          </a>
        </div>

        <div className="stamp absolute bottom-[20%] left-[7%] z-20 grid size-16 place-items-center text-center text-[7px] uppercase text-white/70 md:size-20 md:text-[9px]">
          {badgeLines.slice(-2).map((line, i) => (
            <span key={i}>{line}{i === 0 ? <br /> : null}</span>
          ))}
        </div>

        <div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 text-white/70 md:right-9 md:flex">
          {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="grid size-8 place-items-center rounded-full border border-white/30 text-xs"
            >
              <Icon />
            </a>
          ))}
          <p className="mt-4 rotate-180 text-[10px] uppercase tracking-[0.14em] [writing-mode:vertical-rl]">
            Follow us on social
          </p>
        </div>
      </div>
    </section>
  );
}
