"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainAnimation from "@/components/main/MainAnimation";
import { GradientMesh } from "@/components/main/GradientMesh";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
// import { sendEvent } from "@/utils/analytics/gtag";
// import { useRole } from "@/context/RoleContext";
import { useWindowSize } from "@/hooks/useWindowSize";

const HERO_VISITED_KEY = "hero-animation-visited";
const HERO_DOCUMENT_KEY = "hero-animation-document";
const HERO_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroReveal = (delay: number, shouldAnimate: boolean) => {
  const visibleState = {
    opacity: 1,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    transformPerspective: 1100,
  };

  if (!shouldAnimate) {
    return {
      initial: false,
      animate: visibleState,
      transition: { duration: 0, delay: 0 },
    };
  }

  return {
    initial: {
      opacity: 0,
      y: 38,
      z: -120,
      rotateX: 16,
      rotateY: -10,
      transformPerspective: 1100,
    },
    whileInView: visibleState,
    transition: {
      delay,
      duration: 1.15,
      ease: HERO_REVEAL_EASE,
    },
    viewport: { once: true, amount: 0.15 },
  };
};

let inMemoryDocumentId: string | null = null;

const getDocumentId = () => {
  if (typeof window === "undefined") return "";
  return String(window.performance.timeOrigin);
};

const shouldReplayAnimation = () => {
  if (typeof window === "undefined") return true;

  const documentId = getDocumentId();

  try {
    const hasVisited =
      window.sessionStorage.getItem(HERO_VISITED_KEY) === "true";
    const previousDocumentId = window.sessionStorage.getItem(HERO_DOCUMENT_KEY);
    return !hasVisited || previousDocumentId !== documentId;
  } catch {
    return inMemoryDocumentId !== documentId;
  }
};

const markDocumentVisited = () => {
  const documentId = getDocumentId();
  inMemoryDocumentId = documentId;

  try {
    window.sessionStorage.setItem(HERO_DOCUMENT_KEY, documentId);
    window.sessionStorage.setItem(HERO_VISITED_KEY, "true");
  } catch {
    // The in-memory document ID keeps SPA navigation stable when storage is blocked.
  }
};

export default function Hero() {
  const { setVisited } = useHero();
  const [replayIntro, setReplayIntro] = useState(shouldReplayAnimation);
  const [showStatic, setShowStatic] = useState(() => !replayIntro);
  const [replayKey, setReplayKey] = useState(0);
  // const { roleKey, roleData } = useRole();
  const isMobile = useWindowSize();

  useEffect(() => {
    markDocumentVisited();

    if (!replayIntro) {
      setVisited(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisited(true);
      setShowStatic(true);
    }, 5200);
    return () => window.clearTimeout(timer);
  }, [replayIntro, replayKey, setVisited]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      setReplayIntro(true);
      setShowStatic(false);
      setVisited(false);
      setReplayKey((key) => key + 1);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [setVisited]);

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen px-5 py-10 overflow-hidden text-center bg-ani-gradient">
      <GradientMesh className="z-0" opacity={0.3} speed={0.3} />
      <div className="absolute z-0 hidden left-center top-center md:flex">
        <MainAnimation key={replayKey} showStatic={showStatic} />
      </div>
      <h2 className="relative z-10 font-mono text-xl md:text-2xl">
        Design to Development
      </h2>
      <motion.h1
        key={replayKey}
        {...heroReveal(isMobile ? 0 : 3.2, replayIntro)}
        className="relative z-10 mt-5 text-5xl font-medium text-white sm:text-6xl md:text-8xl"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm">
          {/* <span className="md:ml-[-160px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm"> */}
          {/* <span className="md:ml-[-120px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm"> */}
          {/* <span className={roleKey !== "design" ? "ml-[54px]" : ""}>
            {roleData.titleEn}
          </span> */}
          <span>Design Engineer</span>
        </span>
        <br />
        <span className="md:mr-[-244px] text-nowrap drop-shadow-xl">
          {/* <span className="text-nowrap drop-shadow-xl"> */}
          Dayoung Jung
        </span>
      </motion.h1>

      <motion.div
        key={`hero-copy-${replayKey}`}
        {...heroReveal(isMobile ? 0 : 4, replayIntro)}
        className="relative z-10"
      >
        <p className="mt-16 text-base font-normal leading-7 text-gray-700">
          디자인 기획부터 제작, 구현까지 폭넓게 주도하며
          <br /> 실질적인 성과를 만들어내는 <strong>디자인 엔지니어</strong>
          입니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <a
            href="#main"
            className="relative z-10 inline-flex items-center justify-center gap-2 py-4 text-base font-medium tracking-wide text-gray-900 transition-transform duration-200 border-2 rounded-full px-7 border-gray-900/70 hover:-translate-y-1 hover:bg-white/30"
          >
            Explore More
            <ArrowDown size={20} aria-hidden="true" />
          </a>
          <Link
            href="/projects"
            className="relative z-10 inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium tracking-wide text-white transition-transform duration-200 bg-gray-900 rounded-full shadow-lg hover:-translate-y-1 hover:bg-black"
          >
            View Projects
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        key={`hero-indicator-${replayKey}`}
        {...(replayIntro
          ? fadeUp(isMobile ? 0 : 4, false)
          : {
              initial: false,
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0, delay: 0 },
            })}
        className="absolute z-20 left-center bottom-10"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
