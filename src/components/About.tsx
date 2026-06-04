import { HiArrowUpRight } from "react-icons/hi2";

interface AboutProps {
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function About({
  badge = "⊕ About Us",
  title = "Who we are",
  description = "Khelo Sporting Club is a premier multi-sport community dedicated to fostering athletic excellence, teamwork, and a lifelong passion for sports. From football and cricket to basketball and tennis, we provide world-class facilities, expert coaching, and a vibrant community of athletes at every level.",
  image = "/images/football.jpg",
  ctaText = "Read More",
  ctaLink = "#products",
}: AboutProps) {
  return (
    <section id="about" className="page-grid grid bg-white lg:grid-cols-2 scroll-mt-20">
      <div className="px-6 py-16 md:px-8 md:py-24 lg:px-[max(56px,calc((100vw-1380px)/2+28px))] lg:py-32">
        <p className="mb-8 text-xs text-[#687585] md:mb-10 md:text-sm">{badge}</p>
        <h2 className="display text-4xl leading-none md:text-6xl">{title}</h2>
        <p className="mt-8 max-w-xl text-sm leading-6 text-[#313d4b] md:mt-16 md:text-base md:leading-8">
          {description}
        </p>
        <a href={ctaLink} className="thin-btn mt-8 md:mt-10">
          {ctaText} <HiArrowUpRight />
        </a>
      </div>
      <div className="relative min-h-[400px] w-full overflow-hidden md:min-h-[620px]">
        <img src={image} alt="Players at stadium" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}
