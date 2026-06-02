import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import type { Product } from "@/data/types";

export default function Products({ products }: { products: Product[] }) {
  return (
    <section id="products" className="page-grid bg-white pt-10 md:pt-12 scroll-mt-20">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center lg:gap-8">
          <h2 className="display text-4xl leading-[0.95] md:text-6xl">
            Top products
            <br />✳ in our listing
          </h2>
          <p className="text-[12px] leading-6 text-[#9aa4b1] md:text-sm md:leading-7">
            Explore our top products, meticulously selected for their quality
            and innovation. Each item promises exceptional value and
            performance.
          </p>
          <a href="#subscribe" className="thin-btn">
            Explore All <HiArrowUpRight />
          </a>
        </div>
      </div>

      <div className="mt-10 border-y border-[#d9eaf8] bg-[#eaf7ff] md:mt-12">
        <div className="grid gap-px bg-[#d9eaf8] p-2 md:grid-cols-[1fr_1.75fr_1fr]">
          {products.map((product) => (
            <article key={product.name} className="relative min-h-[240px] overflow-hidden bg-[#eaf7ff] p-6 md:min-h-[300px] md:p-8">
              <h3 className="display relative z-10 max-w-[180px] text-3xl leading-[0.95] md:max-w-[240px] md:text-5xl">
                {product.name}
              </h3>
              {product.price && (
                <p className="display absolute bottom-6 left-6 z-10 text-xl md:bottom-8 md:left-8 md:text-3xl">
                  {product.price}
                </p>
              )}
              <div className={product.wide ? "absolute right-6 top-8 h-40 w-52 md:right-10 md:top-12 md:h-56 md:w-72" : "absolute bottom-8 right-6 h-32 w-36 md:bottom-12 md:right-8 md:h-44 md:w-48"}>
                <Image src={product.image} alt={product.name} fill sizes="33vw" className="object-cover mix-blend-multiply" />
              </div>
              <a href="#subscribe" className="absolute bottom-6 right-6 z-10 grid size-8 place-items-center rounded-full border border-[#a8bdcf] md:bottom-8 md:right-8 md:size-10">
                <HiArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
