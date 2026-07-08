"use client";

import { useEffect, useState } from "react";
import MainAnimation from "@/components/main/MainAnimation";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Mail, MessagesSquare } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
// import { sendEvent } from "@/utils/analytics/gtag";
// import { useRole } from "@/context/RoleContext";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Hero() {
  const { visited, setVisited } = useHero();
  const [showStatic, setShowStatic] = useState(visited);
  // const { roleKey, roleData } = useRole();
  const isMobile = useWindowSize();

  useEffect(() => {
    if (!visited) {
      const timer = setTimeout(() => {
        setVisited(true);
        setShowStatic(true);
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [visited, setVisited]);

  // const handleScrollDown = () => {
  //   window.scrollBy({
  //     top: window.innerHeight,
  //     behavior: "smooth",
  //   });

  //   sendEvent({
  //     action: "click",
  //     category: "portfolio",
  //     label: "heroExplore_button",
  //   });
  // };

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
          디자이너와 개발자 사이의 업무 간극을 줄이고,{" "}
          <br className="hidden sm:block" />
          사용자 중심의 디지털 경험을 제공합니다.
        </p>
        <div className="z-10 flex items-center justify-center gap-2 mt-10">
          <a
            href="mailto:diayeri.dev@gmail.com"
            className="inline-flex items-center gap-1.5 px-4 py-1 text-xs font-medium tracking-widest border rounded-full text-gray-500/90 border-gray-400/60"
          >
            <Mail size={14} className="inline-block" />
            diayeri.dev@gmail.com
          </a>
          <a
            href="https://open.kakao.com/o/sA6r44ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1 text-xs font-medium tracking-widest border rounded-full text-gray-500/90 border-gray-400/60"
          >
            <MessagesSquare size={14} className="inline-block" />
            Kakaotalk Openchat
          </a>
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
