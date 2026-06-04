import Newsletter from "./Newsletter";

interface FooterProps {
  subscribeTitle?: string;
  subscribePlaceholder?: string;
  subscribeButtonText?: string;
}

export default function Footer({ subscribeTitle, subscribePlaceholder, subscribeButtonText }: FooterProps) {
  return (
    <footer id="subscribe" className="relative min-h-[380px] overflow-hidden bg-[#0b1b2a] text-white md:min-h-[470px] scroll-mt-20">
      <img src="/images/hero-bg.jpg" alt="Kids football training" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2a] via-[#0b1b2a]/25 to-transparent" />
      <div className="container-wide absolute inset-x-0 bottom-0 px-4 md:px-0">
        <Newsletter title={subscribeTitle} placeholder={subscribePlaceholder} buttonText={subscribeButtonText} />
        <div className="flex items-center justify-between py-6 md:py-8">
          <a href="#" className="display text-3xl leading-none md:text-5xl">K</a>
          <div className="flex gap-4 text-xs md:gap-7 md:text-sm">
            <a href="#">Linkedin</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
