"use client";

import { useEffect, useState } from "react";
import MainAnimation from "@/components/main/MainAnimation";
import { ScrollIndicator } from "@/components/ScrollIndicator";
// import { Button } from "@/components/Button";
// import { Github, ArrowDown } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
// import { sendEvent } from "@/utils/analytics/gtag";
import { useRole } from "@/context/RoleContext";

export default function Hero() {
  const { visited, setVisited } = useHero();
  const [showStatic, setShowStatic] = useState(visited);
  const { roleKey, roleData } = useRole();

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
    <section className="relative flex flex-col items-center justify-center w-full h-screen py-10 text-center bg-ani-gradient">
      <div className="absolute left-center top-center">
        <MainAnimation showStatic={showStatic} />
      </div>
      <h2 className="font-mono text-2xl">Design to Development</h2>
      <motion.h1
        {...fadeUp(3.2, visited)}
        className="z-10 mt-5 font-medium text-white text-8xl"
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

      <motion.div {...fadeUp(4, visited)}>
        <p className="mt-16 text-base font-medium leading-7 text-gray-700/80">
          UX 인사이트를 바탕으로 UI 디자인과 프론트엔드 개발을 통합 수행하며,
          <br />
          유지보수성 높은 디자인 시스템 구축 및 구현을 주도합니다.
        </p>
        <div className="z-10 flex flex-col justify-center gap-2 mt-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400/80">
            Focused on UI/UX Design
          </span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400/80">
            Frontend Development
          </span>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(4, visited)}
        className="absolute left-center bottom-10"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
