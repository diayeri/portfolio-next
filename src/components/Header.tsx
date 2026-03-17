"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <header className="fixed top-0 z-50 w-full px-6 py-4 border-b backdrop-blur-lg border-gray-400/10 bg-gray-50/30">
      <div className="grid items-center justify-between w-full grid-cols-3">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-mono text-base font-black tracking-tighter text-gray-900 transition-colors hover:text-primary"
          >
            DtoD
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center justify-center gap-10">
          <Link
            href="/projects"
            className={`text-xs font-bold tracking-[0.2em] uppercase transition-all ${
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
            className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-gray-600 transition-all"
          >
            Career
          </Link>
        </nav>

        {/* Right: Build Date & Github */}
        <div className="flex items-center justify-end">
          <a
            href="https://github.com/diayeri/portfolio-next"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 transition-colors group hover:text-gray-900"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
              Github
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-50 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
