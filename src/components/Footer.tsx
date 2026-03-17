"use client";

import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

const BuildDate = () => {
  const buildDateString =
    process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString();
  const formattedDate = buildDateString.split("T")[0].replace(/-/g, ".");

  return formattedDate;
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-gray-100 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 max-w-[1400px] mx-auto gap-8">
        {/* Left: Brand & Build Date */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            href="/"
            className="font-mono text-lg font-black tracking-tighter text-gray-900 transition-colors hover:text-primary"
          >
            DtoD
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
            <span>Last Updated</span>
            <span className="text-gray-400">{BuildDate()}</span>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="order-3 text-xs tracking-tight text-center text-gray-400 md:order-2">
          &copy; {new Date().getFullYear()} UI Designer & Developer Dayoung
          Jung.
          <span className="hidden sm:inline"> All rights reserved.</span>
        </div>

        {/* Right: Social Links */}
        <div className="flex order-2 gap-6 md:order-3">
          <a
            href="mailto:jdyoung1031@gmail.com"
            className="text-gray-400 transition-colors hover:text-gray-900"
            title="Mail"
          >
            <Mail size={18} strokeWidth={2.5} />
          </a>
          <a
            href="https://github.com/diayeri"
            target="_blank"
            rel="noopener"
            className="text-gray-400 transition-colors hover:text-gray-900"
            title="GitHub"
          >
            <Github size={18} strokeWidth={2.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/diayeri/"
            target="_blank"
            rel="noopener"
            className="text-gray-400 transition-colors hover:text-gray-900"
            title="LinkedIn"
          >
            <Linkedin size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
