"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainAnimation from "@/components/MainAnimation";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Button } from "@/components/Button";
import { Github, ArrowDown } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
import { sendEvent } from "@/utils/analytics/gtag";

export default function Hero() {
  const { visited, setVisited } = useHero();
  const [showStatic, setShowStatic] = useState(visited);
  const queryRole = useSearchParams().get("role");

  useEffect(() => {
    if (!visited) {
      const timer = setTimeout(() => {
        setVisited(true);
        setShowStatic(true);
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [visited, setVisited]);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });

    sendEvent({
      action: "click",
      category: "portfolio",
      label: "heroExplore_button",
    });
  };

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
        {queryRole === "design" ? (
          <span className="ml-[-102px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm">
            UI Designer,
          </span>
        ) : (
          <span className="ml-[-48px] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-black drop-shadow-sm">
            UI Developer,
          </span>
        )}
        <br />
        <span className="mr-[-244px] text-nowrap drop-shadow-xl">
          Dayoung Jung
        </span>
      </motion.h1>

      <motion.div {...fadeUp(4, visited)}>
        <p className="mt-20 text-base">
          디자인 이해를 바탕으로 UI 개발을 주력으로 하며 <br />
          React, TypeScript 기반 프론트엔드 환경에서 <br />
          컴포넌트 구현과 기능 개발을 수행해온 UI{" "}
          {queryRole === "design" ? "디자이너" : "개발자"}입니다.
        </p>
        <div className="z-10 flex justify-center gap-2 mt-8">
          <Button
            href="https://github.com/diayeri"
            color="primary"
            variant="outline"
            iconRight={<Github />}
            onClick={() =>
              sendEvent({
                action: "click",
                category: "portfolio",
                label: "heroGithub_button",
              })
            }
          >
            Github
          </Button>
          <Button onClick={handleScrollDown} iconRight={<ArrowDown />}>
            Explore
          </Button>
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
