"use client";

import { timelineData } from "@/data/timelineData";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
import { useRole } from "@/context/RoleContext";

export default function Timeline() {
  const { roleData } = useRole();

  return (
    <section
      className="w-full px-5 py-16 md:py-24 md:px-10 max-w-[1400px] mx-auto"
      id="timeline"
    >
      <div className="lg:flex">
        {/* Left */}
        <div className="lg:pr-40 lg:w-1/2">
          <motion.h2
            {...fadeUp(0, false)}
            className="text-4xl font-bold md:text-5xl"
          >
            Career Roadmap
          </motion.h2>
          <div className="flex flex-col gap-8 mt-12 text-base text-gray-500 lg:text-sm break-keep">
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 lg:text-base">
                비즈니스 가치를 만드는 UX/UI 설계
              </h3>
              <p>
                UX/UI 디자인 전공을 시작으로 8년여간 웹 기술의 변화를 실무에서
                겪어왔습니다. 밀알복지재단 결제 UX 리뉴얼로 모바일 후원 200%
                증대를 이끌어냈으며, 기획의 의도가 실질적인 성과로 이어지는
                과정을 주도해 왔습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 lg:text-base">
                협업의 병목을 해결하는 시스템 구축
              </h3>
              <p>
                단순 구현을 넘어 WBS 설계와 Atomic Design 아키텍처를 제안하여 팀
                생산성을 높입니다. 카카오 크러스트 유니버스 등에서 Storybook
                기반 UI 문서화를 주도하며 디자이너와 개발자 사이의 간극을 줄이는
                브릿지(Bridge) 역할을 수행합니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 lg:text-base">
                준비된 End-to-End 전문가
              </h3>
              <p>
                초기 기획 검증부터 고도화된 React/TypeScript 구현, 유지보수까지
                전 과정을 책임지는 올라운더로 성장하고 있습니다. 8년의 현장
                감각과 최신 기술 스택을 결합해, 사용자에게는 즐거운 경험을,
                팀에게는 확장 가능한 구조를 제공하겠습니다.
              </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="relative mt-16 lg:mt-0 lg:w-1/2">
          <div className="absolute top-0 -translate-x-[50%] left-0 w-[2px] h-full bg-gradient-to-t from-primary-dark to-primary-light" />
          <div className="py-2 space-y-12">
            {timelineData.map((event, idx) => (
              <div key={idx} className="relative">
                {/* 점 */}
                <div className="absolute -translate-x-[50%] w-3 h-3 border-primary border-2 rounded-full bg-white top-[6px]" />

                {/* 이벤트 내용 */}
                <div className="pl-8 md:pl-12">
                  <p className="text-sm text-gray-500">{event.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{event.title}</h3>
                  <h3 className="text-2xl text-primary-dark">
                    {roleData.replaceRole(event.role)}
                  </h3>
                  <p className="mt-4 text-base font-medium text-gray-700">
                    {event.details}
                  </p>
                  {event.highlights && (
                    <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
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
