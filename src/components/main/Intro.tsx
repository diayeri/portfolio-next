"use client";

import { TechMarquee } from "./TechMarquee";

export default function Intro() {
  const values = [
    {
      title: "Design & Dev Efficiency",
      highlight: "유지보수가 용이한 구조",
      description:
        "디자인 시스템의 컴포넌트화를 통해 불필요한 구현 반복을 방지하고, 유지보수가 용이한 구조를 설계하여 제품의 품질을 높입니다.",
    },
    {
      title: "Reliable Workflow",
      highlight: "WBS 기반의 병렬 작업 구조",
      description:
        "단순한 일정 체크를 넘어, WBS 기반의 병렬 작업 구조를 설계해 업무 정체 구간을 해소하고 기한 내 안정적인 진행을 책임집니다.",
    },
    {
      title: "Collaborative Bridge",
      highlight: "새로운 협업 방식을 제안",
      description:
        "UI 디자인과 개발을 주도적으로 이끌며, 반복 공정을 줄이는 새로운 협업 방식을 제안해 팀의 업무 과중을 덜고 생산성을 높입니다.",
    },
    {
      title: "Product Ownership",
      highlight: "사용성 개선을 위한 자발적인 의견 제시와 실행",
      description:
        "직무의 경계에 갇히지 않고 서비스의 본질을 고민하며, 사용성 개선을 위한 자발적인 의견 제시와 실행에 적극 참여합니다.",
    },
  ];

  const skills = [
    {
      category: "Development",
      skills: ["React", "Next.js", "TypeScript"],
      desc: "Atomic Design 기반의 확장 가능한 아키텍처 설계",
    },
    {
      category: "Style & UI",
      skills: ["Tailwind", "SCSS", "Storybook"],
      desc: "디자인 시스템 고도화 및 UI 문서화",
    },
    {
      category: "Visual Strategy",
      skills: ["Figma", "Photoshop", "Illustrator"],
      desc: "서비스 톤앤매너 정의 및 디자인",
    },
    {
      category: "Collaboration",
      skills: ["Git", "JIRA", "Notion"],
      desc: "능동적인 일정 및 태스크 관리",
    },
  ];

  return (
    <section
      className="relative flex flex-col items-center w-full px-5 py-16 overflow-hidden"
      id="about"
    >
      <div className="absolute inset-0 z-0 items-center hidden opacity-50 md:flex">
        <TechMarquee />
      </div>
      <div className="absolute inset-0 z-10 backdrop-blur-xl bg-white [mask-image:radial-gradient(circle_at_center,_black_50%,transparent_70%)] [pointer-events:none]" />
      <div className="z-20 flex flex-col items-center max-w-5xl gap-12 mx-auto lg:px-6 md:py-12 md:flex-row lg:gap-24">
        {/* 1. Core Value (좌측) */}
        <section className="flex-[1.4] flex flex-col gap-8 lg:gap-x-8 lg:gap-y-12">
          {values.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 transition-colors border-l-2 border-gray-100 group hover:border-primary/50"
            >
              <span className="absolute -left-[2px] top-0 h-8 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
              <h4 className="mb-2 text-xl font-semibold tracking-tight transition-all md:text-2xl text-primary-dark">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base break-keep">
                {item.description.split(item.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <strong className="font-semibold text-gray-900">
                        {item.highlight}
                      </strong>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </section>

        {/* 2. Technical Expertise (우측) */}
        <section className="flex-1 w-full px-8 pb-8 overflow-hidden border bg-gray-50/50 rounded-3xl border-gray-100/50">
          <h3 className="text-xs font-black tracking-[0.2em] uppercase mb-8 opacity-70 -mx-8 px-8 bg-gray-300 text-white py-3">
            Technical Expertise
          </h3>

          <div className="grid grid-cols-1 gap-y-9 gap-x-8">
            {skills.map((group, i) => (
              <div key={i} className="group/item">
                <div className="flex justify-between items-end mb-2 border-b border-gray-200/50 pb-1.5">
                  <p className="text-xs font-bold tracking-widest uppercase text-primary-light">
                    {group.category}
                  </p>
                </div>

                <div className="flex flex-wrap mb-2 gap-x-4 gap-y-1">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-base font-bold text-gray-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-xs leading-tight text-gray-400">
                  {group.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 보조 스택 */}
          <div className="flex flex-wrap gap-2 mt-8 opacity-40">
            {["Redux", "Recoil", "MUI", "Bootstrap"].map((etc, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-2 py-0.5 border border-gray-300 rounded text-gray-700"
              >
                {etc}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
