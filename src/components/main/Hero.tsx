"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainAnimation from "@/components/main/MainAnimation";
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

const getDocumentId = () => {
  if (typeof window === "undefined") return "";
  return String(performance.timeOrigin);
};

const isPageReload = () => {
  if (typeof window === "undefined") return false;
  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navigation?.type === "reload";
};

const isExternalEntry = () => {
  if (typeof window === "undefined" || !document.referrer) return false;
  return new URL(document.referrer).origin !== window.location.origin;
};

const shouldReplayAnimation = () => {
  if (typeof window === "undefined") return false;

  const hasVisited = sessionStorage.getItem(HERO_VISITED_KEY) === "true";
  const isNewDocument =
    sessionStorage.getItem(HERO_DOCUMENT_KEY) !== getDocumentId();

  return (
    !hasVisited || (isNewDocument && (isPageReload() || isExternalEntry()))
  );
};

export default function Hero() {
  const { visited, setVisited } = useHero();
  const [showStatic, setShowStatic] = useState(() => {
    if (visited || typeof window === "undefined") return visited;
    return !shouldReplayAnimation();
  });
  // const { roleKey, roleData } = useRole();
  const isMobile = useWindowSize();

  useEffect(() => {
    const shouldReplay = shouldReplayAnimation();
    sessionStorage.setItem(HERO_DOCUMENT_KEY, getDocumentId());

    if (!shouldReplay) {
      setVisited(true);
      setShowStatic(true);
      return;
    }

    sessionStorage.setItem(HERO_VISITED_KEY, "true");

    const timer = setTimeout(() => {
      setVisited(true);
      setShowStatic(true);
    }, 5200);
    return () => clearTimeout(timer);
  }, [setVisited]);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });

    //   sendEvent({
    //     action: "click",
    //     category: "portfolio",
    //     label: "heroExplore_button",
    //   });
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen px-5 py-10 overflow-hidden text-center bg-ani-gradient">
      <div className="absolute hidden left-center top-center md:flex">
        <MainAnimation showStatic={showStatic} />
      </div>
      <h2 className="font-mono text-xl md:text-2xl">Design to Development</h2>
      <motion.h1
        {...fadeUp(isMobile ? 0 : 3.2, visited)}
        className="z-10 mt-5 text-5xl font-medium text-white sm:text-6xl md:text-8xl"
      >
        <span className="md:ml-[-160px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm">
          {/* <span className="md:ml-[-120px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm"> */}
          {/* <span className={roleKey !== "design" ? "ml-[54px]" : ""}>
            {roleData.titleEn}
          </span> */}
          <span>UX Engineer</span>
        </span>
        <br />
        <span className="md:mr-[-244px] text-nowrap drop-shadow-xl">
          Dayoung Jung
        </span>
      </motion.h1>

      <motion.div {...fadeUp(isMobile ? 0 : 4, visited)}>
        <p className="mt-16 text-base font-normal leading-7 text-gray-700">
          아이디어를 사용자 경험으로, 사용자 경험을 실제 서비스로 구현하는 UX
          디자인 엔지니어입니다.
          <br className="hidden sm:block" />
          사용자 경험과 개발 구조를 함께 고민하여 더 나은 제품을 만드는 것을
          목표로 합니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={handleScrollDown}
            className="z-10 inline-flex items-center justify-center gap-2 py-4 text-base font-medium tracking-wide text-gray-900 transition-transform duration-200 border-2 rounded-full px-7 border-gray-900/70 hover:-translate-y-1 hover:bg-white/30"
          >
            Explore More
            <ArrowDown size={20} aria-hidden="true" />
          </button>
          <Link
            href="/projects"
            className="z-10 inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium tracking-wide text-white transition-transform duration-200 bg-gray-900 rounded-full shadow-lg hover:-translate-y-1 hover:bg-black"
          >
            View Projects
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(isMobile ? 0 : 4, visited)}
        className="absolute left-center bottom-10"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
