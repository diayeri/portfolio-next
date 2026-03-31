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
      <div className="flex flex-col items-center justify-between w-full gap-5 px-4 py-12 md:px-8 md:flex-row">
        {/* Left: Brand & Build Date */}
        <div className="flex flex-col items-center gap-2 md:items-start md:w-1/4">
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
        <div className="order-3 text-[10px] md:text-xs tracking-tight text-center text-gray-400 md:order-2 leading-relaxed">
          <p className="font-bold text-gray-400 uppercase tracking-[0.15em] mb-0.5">
            Design & Development by Dayoung Jung
          </p>

          <p className="mt-1 opacity-80">
            &copy; {new Date().getFullYear()} All rights reserved.
            <span className="mx-2 opacity-30">|</span>
            기획부터 구현까지 직접 제작한 포트폴리오입니다.
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex justify-end order-2 gap-6 md:w-1/4">
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
