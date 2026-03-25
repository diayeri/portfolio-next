"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const scrollToTimeline = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const timeline = document.getElementById("timeline");
      timeline?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-4 border-b md:px-6 backdrop-blur-lg border-gray-400/10 bg-gray-50/30">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        {/* Left: Brand */}
        <div className="flex-1">
          <Link
            href="/"
            className="font-mono text-sm font-black tracking-tighter text-gray-900 transition-colors md:text-base hover:text-primary"
          >
            DtoD
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center justify-center gap-6 md:gap-10">
          <Link
            href="/projects"
            className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all ${
              pathname.includes("/projects")
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/#timeline"
            onClick={scrollToTimeline}
            className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-gray-600 transition-all"
          >
            Career
          </Link>
        </nav>

        {/* Right: Github - 모바일 아이콘 대응 */}
        <div className="flex items-center justify-end flex-1">
          <a
            href="https://github.com/diayeri/portfolio-next"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 transition-colors group hover:text-gray-900"
          >
            {/* 모바일: Github 아이콘만 노출 */}
            <Github size={18} className="md:hidden" />

            {/* 데스크톱: 'Github' 텍스트 노출 */}
            <span className="hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase">
              Github
            </span>

            {/* 데스크톱: 화살표 아이콘 노출 */}
            <ArrowUpRight
              size={14}
              className="hidden md:block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-50 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
