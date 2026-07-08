"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { projectsData } from "@/data/projectsData";

const ProjectShowcase: React.FC = () => {
  const params = useSearchParams();
  const targetProjectId = params?.get("project");

  const items = useMemo(() => {
    // 1. 기본 쇼케이스 후보군 (showcase 리스트 중 숨겨지지 않은 것들)
    const baseFeatured = projectsData.filter(
      (p) => p.showcase !== undefined && !p.showcase?.showOnlyViaLink,
    );

    // 2. showcase.order 기준 오름차순 정렬 (order가 없는 경우를 대비해 기본값 999 설정)
    const sortedBase = [...baseFeatured].sort((a, b) => {
      const orderA = a.showcase?.order ?? 999;
      const orderB = b.showcase?.order ?? 999;
      return orderA - orderB;
    });

    // 3. URL 파라미터로 강제 진입한 프로젝트가 있는 경우
    if (targetProjectId) {
      const matchedProject = projectsData.find((p) => p.id === targetProjectId);

      if (matchedProject) {
        // 정렬된 리스트에서 해당 프로젝트 제외 후 맨 앞에 추가
        const filteredList = sortedBase.filter((p) => p.id !== targetProjectId);
        return [matchedProject, ...filteredList].slice(0, 5);
      }
    }

    // 4. 파라미터가 없거나 매칭되는 프로젝트가 없으면 기본 리스트 반환
    return baseFeatured.slice(0, 3);
  }, [targetProjectId]);

  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;

    const interval = window.setInterval(() => {
      setActive((s) => (s + 1) % items.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isHovered, items.length]);

  const prev = useCallback(() => {
    setActive((s) => (s - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setActive((s) => (s + 1) % items.length);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section
      className="relative flex items-center w-full h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={items[active].id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex w-full h-full"
        >
          <Link
            href={`/projects/${items[active].id}`}
            className="relative flex w-full h-full mx-auto overflow-hidden rounded-3xl"
          >
            <NextImage
              src={items[active].showcase!.cover}
              alt={items[active].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/70" />
            <div className="max-w-[460px] mx-auto z-10 flex flex-col items-center justify-center w-full h-full gap-5 p-10 text-center text-white">
              <h2 className="text-3xl font-bold leading-relaxed text-white md:text-5xl">
                {items[active].title}
              </h2>
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
                {items[active].tag?.map((tech, index) => (
                  <span
                    key={index}
                    className="text-base font-semibold text-gray-200"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span className="font-semibold text-primary-light">
                  {items[active].client}
                </span>
                {/* <span>{items[active].startDate}</span> */}
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        aria-label="Prev"
        onClick={prev}
        className="absolute left-0 z-10 flex items-center justify-start w-[40px] md:w-[80px] h-full p-2 md:p-4 group"
      >
        <span className="p-2 transition-all duration-500 bg-white rounded-full shadow-sm group-hover:opacity-80 opacity-40">
          <ChevronLeftIcon size={24} />
        </span>
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-0 z-10 flex items-center justify-end w-[40px] md:w-[80px] h-full p-2 md:p-4 group"
      >
        <span className="p-2 transition-all duration-500 bg-white rounded-full shadow-sm group-hover:opacity-80 opacity-40">
          <ChevronRightIcon size={24} />
        </span>
      </button>

      {/* Dots */}
      <div className="absolute z-10 flex items-center justify-center gap-2.5 -translate-x-1/2 left-1/2 bottom-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${i === active ? "bg-primary-light" : "bg-gray-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
