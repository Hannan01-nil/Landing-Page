import type { Metadata } from "next";
import Newsletter from "@/components/Newsletter";
import { getSubscribeSection, getSeo } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  const entry = seo?.entries?.find((e: { route: string }) => e.route === "/subscribe");
  return {
    title: entry?.title || "Subscribe - Khelo Sporting Club",
    description: entry?.description || "Subscribe to the Khelo Sporting Club newsletter for updates.",
    openGraph: { images: [{ url: entry?.ogImage || "/khelo.png" }] },
  };
}

export default async function SubscribePage() {
  const subscribeSection = await getSubscribeSection();

  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#0b1b2a] text-white">
      <img src="/images/hero-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2a] via-[#0b1b2a]/25 to-transparent" />
      <div className="container-wide relative px-4 md:px-0">
        <div className="max-w-2xl">
          <Newsletter
            title={subscribeSection?.title}
            placeholder={subscribeSection?.placeholder}
            buttonText={subscribeSection?.buttonText}
          />
        </div>
      </div>
    </section>
  );
}
