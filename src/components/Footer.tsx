"use client";

import {
  HiOutlineHeart,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-white">KHELO</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Igniting passion through sports. Join the Khelo community and be
              part of something bigger than the game.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Sports",
                "Schedule",
                "Players",
                "Gallery",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Membership",
                "Terms & Conditions",
                "Privacy Policy",
                "Careers",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-red-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  123 Sports Avenue, Stadium District
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-red-500 shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-red-500 shrink-0" />
                <a
                  href="mailto:info@khelo.com"
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  info@khelo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Khelo Sporting Club. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            Made with <HiOutlineHeart className="text-red-500" /> by the Khelo
            team
          </div>
        </div>
      </div>
    </footer>
  );
}
