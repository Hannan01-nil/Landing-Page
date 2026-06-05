export default function Footer() {
  return (
    <footer className="bg-[#0b1b2a] text-white">
      <div className="container-wide flex items-center justify-between px-4 py-6 md:px-0 md:py-8">
        <a href="/" className="display text-3xl leading-none md:text-5xl">K</a>
        <div className="flex gap-4 text-xs md:gap-7 md:text-sm">
          <a href="#">Linkedin</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
