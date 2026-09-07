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
          <div className="flex flex-col gap-8 mt-12 text-gray-500 lg:text-sm break-keep">
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700">
                문제를 발견하고, 제품으로 해결합니다
              </h3>
              <p className="text-[15px] leading-relaxed">
                UX/UI 디자인을 전공하고 웹디자인과 퍼블리싱으로 커리어를 시작해,
                React 기반 UI 개발과 프론트엔드 개발까지 영역을 확장해왔습니다.
                사용자의 불편을 발견하고 더 나은 경험을 설계하고, 아이디어를
                실제 서비스로 구현하는 열정이 있습니다.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed">
                밀알복지재단에서는 후원 결제 프로세스의 UX를 개선하여 모바일
                후원 성과를 전년 대비 200% 성장시키는 경험을 했습니다. 사용자
                관점에서 문제를 정의하고, 디자인과 개발로 구체화했을 때 비즈니스
                성과로 이어지는 것을 확인했습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700">
                디자인과 개발을 연결하고, 더 효율적인 구조를 만듭니다
              </h3>
              <p className="text-[15px] leading-relaxed">
                디자인과 개발 양쪽의 업무를 경험한 만큼, 각 직군 사이에서
                발생하는 병목을 이해하고 해결하는 데 강점이 있습니다. 디자인
                일정이 개발을 지연시키는 상황에서는 반응형 UI를 직접 설계하고
                마크업하여 개발을 먼저 진행하고, 이후 필요한 부분을 반영하는
                방식으로 협업 효율을 높였습니다.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed">
                또한 정적인 마크업 중심의 UI 개발에서 React/TypeScript 기반의
                컴포넌트 단위 개발 방식으로 전환하며 재사용성과 유지보수성을
                높였습니다. Storybook을 활용한 UI 문서화와 디자인 시스템 정리를
                통해 팀이 일관된 UI를 빠르게 개발할 수 있는 환경을 구축한 경험이
                있습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-gray-700">
                화면을 넘어, 서비스 전체를 이해하는 개발자로
              </h3>
              <p className="text-[15px] leading-relaxed">
                최근에는 실제 서비스를 기획하고 개발하며 아이디어, 기획, 기술
                검토, 개발, 배포로 이어지는 전체 과정을 직접 경험하고 있습니다.
                정리되지 않은 요구사항을 구체적인 기획안과 기술 명세로 정리하고,
                Next.js, TypeScript, Supabase, Vercel을 활용해 통합 신청
                사이트와 관리자 웹페이지를 설계/개발하고 있습니다.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed">
                새로운 기술을 단순히 공부하는 것보다 실제 문제를 해결하는
                과정에서 개념을 이해하고 기술을 선택하는 방식을 중요하게
                생각합니다. 앞으로도 사용자와 비즈니스의 문제를 이해하고, 필요한
                기능을 스스로 정의하며, 복잡한 문제를 단순하고 확장 가능한
                제품으로 만들어가는 프론트엔드 개발자로 성장하겠습니다.
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
