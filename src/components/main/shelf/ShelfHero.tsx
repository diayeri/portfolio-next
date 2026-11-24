"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import Polaroid from "@/components/main/shelf/Polaroid";
import { getWallPhotos } from "@/data/shelfItems";

/**
 * 메인 "내 공간" 장면 (Phase 3: 벽 + 폴라로이드).
 * 선반/물건/액자는 Phase 4, 정돈 버튼·목록 보기·입장 애니메이션은 Phase 5.
 * 위치는 저장하지 않는다: 새로고침하면 항상 정돈 상태로 시작한다.
 */
export default function ShelfHero() {
  const wallRef = useRef<HTMLElement>(null);
  const photos = useMemo(() => getWallPhotos(), []);
  // 배열 뒤쪽일수록 앞에 보인다
  const [stack, setStack] = useState(() => photos.map((photo) => photo.id));

  const bringToFront = useCallback((id: string) => {
    setStack((prev) =>
      prev[prev.length - 1] === id
        ? prev
        : [...prev.filter((item) => item !== id), id],
    );
  }, []);

  return (
    <section
      ref={wallRef}
      aria-labelledby="shelf-hero-title"
      className="relative w-full min-h-[max(100svh,46rem)] overflow-hidden bg-background bg-[radial-gradient(ellipse_at_40%_35%,var(--color-background-light),var(--color-background)_55%,var(--color-background-dark))] md:min-h-[max(100svh,40rem)]"
    >
      {/* 텍스트 레이어: 사진을 끌어다 덮을 수 있도록 레이어 자체는 포인터를 통과시킨다 */}
      <div className="pointer-events-none relative z-[1] flex min-h-[inherit] flex-col px-6 pt-24 md:items-end md:justify-center md:px-[7vw] md:pt-16">
        <div className="md:w-[42%] md:text-right">
          <h2 className="font-mono text-sm text-text-light md:text-lg">
            Design to Development
          </h2>
          <h1
            id="shelf-hero-title"
            className="mt-3 text-[2.6rem] font-medium leading-[1.05] tracking-[-0.02em] text-text-dark md:mt-4 md:text-6xl lg:text-7xl"
          >
            <span className="block text-primary">Design Engineer</span>
            <span className="block">Dayoung Jung</span>
          </h1>
          <p className="mt-5 text-sm leading-6 text-text-light md:mt-8 md:text-base md:leading-7">
            디자인 기획부터 제작, 구현까지 폭넓게 주도하며
            <br /> 실질적인 성과를 만들어내는{" "}
            <strong className="font-semibold text-text">디자인 엔지니어</strong>
            입니다.
          </p>
          <div className="pointer-events-auto mt-6 flex flex-wrap gap-2.5 md:mt-10 md:justify-end md:gap-3">
            <a
              href="#timeline"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-text px-5 py-3 text-sm font-medium text-text transition-colors duration-200 hover:border-secondary hover:text-secondary-dark md:px-7 md:py-4 md:text-base"
            >
              Explore More
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text-dark px-5 py-3 text-sm font-medium text-surface-light shadow-lg shadow-gray-900/20 transition-colors duration-200 hover:bg-secondary-dark md:px-8 md:py-4 md:text-base"
            >
              View Projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* 벽: 대표 프로젝트 폴라로이드 */}
      <ul aria-label="대표 프로젝트" className="m-0 list-none p-0">
        {photos.map((photo) => (
          <li key={photo.id}>
            <Polaroid
              photo={photo}
              wallRef={wallRef}
              zIndex={2 + stack.indexOf(photo.id)}
              onPick={bringToFront}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
