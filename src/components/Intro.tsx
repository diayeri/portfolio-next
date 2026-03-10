"use client";

import { TechMarquee } from "./TechMarquee";

export default function Intro() {
  const values = [
    {
      title: "Design & Dev Efficiency",
      highlight: "전체 공정을 최적화",
      description:
        "디자인과 개발 사이의 간극을 줄여 전체 공정을 최적화하고, 실무 중심의 설계로 개발 일정을 단축합니다.",
    },
    {
      title: "Reliable Workflow",
      highlight: "WBS 기반의 병렬 작업 구조",
      description:
        "단순한 일정 체크를 넘어, WBS 기반의 병렬 작업 구조를 설계해 업무 정체 구간을 해소하고 기한 내 안정적인 안착을 책임집니다.",
    },
    {
      title: "Collaborative Bridge",
      highlight: "표준화된 가이드와 도구",
      description:
        "동료가 기능 개발에 집중할 수 있도록 표준화된 가이드와 도구를 제공하며, 함께 몰입할 수 있는 유연한 팀 문화를 지향합니다.",
    },
    {
      title: "Product Ownership",
      highlight: "직무 범위에 갇히지 않고",
      description:
        "직무 범위에 갇히지 않고 서비스 성장에 필요한 일이라면 무엇이든 적극적으로 제안하고 실행하며 사용성을 고민합니다.",
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
    <section className="relative flex flex-col items-center w-full px-10 py-16 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center opacity-50">
        <TechMarquee />
      </div>
      <div
        className="absolute inset-0 z-10 
      backdrop-blur-xl bg-white
      [mask-image:radial-gradient(circle_at_center,_black_50%,transparent_70%)]
      [pointer-events:none]"
      />
      <div className="z-20 flex flex-col items-center max-w-5xl gap-12 px-6 py-12 mx-auto lg:flex-row lg:gap-24">
        {/* 1. Core Value (좌측) */}
        <section className="flex-[1.4] space-y-12">
          {values.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 transition-colors border-l-2 border-gray-100 group hover:border-primary/50"
            >
              <span className="absolute -left-[2px] top-0 h-8 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

              <h4 className="mb-2 text-2xl tracking-tight text-primary-dark">
                {item.title}
              </h4>

              <p className="text-base leading-relaxed text-gray-500">
                {item.description.split(item.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <strong className="font-semibold text-gray-700">
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
        {/* <section className="flex-1 w-full p-8 border bg-gray-50/50 rounded-3xl border-gray-100/50"> */}
        <section className="flex-1 w-full px-8 pb-8 overflow-hidden border bg-gray-50/50 rounded-3xl border-gray-100/50">
          {/* <h3 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase mb-10 opacity-70"> */}
          <h3 className="text-xs font-black tracking-[0.2em] uppercase mb-8 opacity-70 -mx-8 px-8 bg-gray-300 text-white py-3">
            Technical Expertise
          </h3>

          <div className="grid gap-y-9">
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
