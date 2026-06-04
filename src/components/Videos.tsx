import Image from "next/image";
import { HiPlay } from "react-icons/hi2";
import type { Video } from "@/data/types";

export default function Videos({ videos, sectionTitle, sectionDescription, featuredImage, featuredAlt }: { videos: Video[]; sectionTitle?: string; sectionDescription?: string; featuredImage?: string; featuredAlt?: string }) {

  return (
    <section className="bg-white py-12 md:py-14">
      <div className="container-wide">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="display text-4xl leading-none md:text-6xl">{sectionTitle || "Highlighted Match"}</h2>
          <p className="mt-3 text-xs leading-5 text-[#586575] md:mt-4 md:text-sm md:leading-6">
            {sectionDescription || "An exciting match with top teams, thrilling action, and unforgettable moments."}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-12 md:gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[430px]">
            {featuredImage ? (
              <Image src={featuredImage} alt={featuredAlt || "Highlighted match"} fill sizes="60vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-[#0b1b2a]/35" />
            <button aria-label="Play highlighted match" suppressHydrationWarning className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0b1b2a] md:size-16">
              <HiPlay />
            </button>
          </div>
          <div className="grid gap-4 md:gap-5">
            {videos.map((video) => (
              <article key={video.title} className="grid grid-cols-[120px_1fr] gap-3 md:grid-cols-[180px_1fr] md:gap-5">
                <div className="relative h-24 overflow-hidden md:h-28">
                  <Image src={video.thumbnail} alt={video.title} fill sizes="180px" className="object-cover" />
                  <span className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-1 text-[8px] text-white md:text-[10px]">
                    {video.duration}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-5 md:text-base md:leading-6">{video.title}</h3>
                  <p className="mt-2 text-[11px] text-[#8c98a5] md:mt-5 md:text-sm">
                    Published : {video.publishedDate}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
