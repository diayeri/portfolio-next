"use client";

import { timelineData } from "@/data/timelineData";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";

export default function Timeline() {
  const queryRole = useSearchParams().get("role");

  return (
    <section className="w-full px-10 py-20">
      <div className="max-w-[1400px] mx-auto flex">
        {/* Left */}
        <div className="w-1/2 pr-40">
          <motion.h2 {...fadeUp(0, false)} className="text-5xl font-bold">
            Career History
          </motion.h2>
          <div className="flex flex-col gap-2 mt-10 text-base text-gray-500 break-keep">
            <p>
              UI 개발로 경력을 시작한 후, 디자인과 프론트엔드까지 영역을
              확장하며
              <br />웹 서비스 전반을 이해하고 구현할 수 있는 경험을
              쌓아왔습니다.
            </p>
            <p>
              디자인 시스템과 구조를 고려한 UI 구현으로 프로젝트 완성도를
              높이고, <br />
              React, TypeScript 환경에서 원활하게 협업합니다.
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="relative w-1/2">
          <div className="absolute top-0 -translate-x-[50%] left-0 w-[2px] h-full bg-gradient-to-t from-primary-dark to-primary-light" />
          <div className="py-2 space-y-12">
            {timelineData.map((event, idx) => (
              <div key={idx} className="relative">
                {/* 점 */}
                <div className="absolute -translate-x-[50%] w-4 h-4 border-white border-4 rounded-full bg-primary top-[6px]" />

                {/* 이벤트 내용 */}
                <div className="pl-12">
                  <p className="text-base text-gray-500">{event.period}</p>
                  <h3 className="mt-2 text-3xl font-semibold">{event.title}</h3>
                  <h3 className="text-3xl font-medium text-primary-dark">
                    {queryRole === "design" && event.role === "UI Developer"
                      ? "Web Publisher"
                      : event.role}
                  </h3>
                  <p className="mt-4 text-base font-medium">{event.details}</p>
                  {event.highlights && (
                    <ul className="mt-2 text-base text-gray-700 list-disc list-inside">
                      {event.highlights.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
