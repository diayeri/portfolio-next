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
      id: "frontend",
      category: "Frontend",
      shortLabel: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "jQuery"],
      desc: "React와 Next.js 기반의 확장 가능한 프론트엔드 아키텍처 설계 및 구현",
    },
    {
      id: "design-system",
      category: "Styling & Design System",
      shortLabel: "Design system",
      skills: [
        "Tailwind CSS",
        "SCSS",
        "Storybook",
        "Figma",
        "MUI",
        "Bootstrap",
        "Photoshop",
        "Illustrator",
      ],
      desc: "디자인 시스템 고도화, 컴포넌트화 및 UI 문서화",
    },
    {
      id: "deployment",
      category: "Backend & Deployment",
      shortLabel: "Deployment",
      skills: ["Supabase", "Vercel"],
      desc: "백엔드 서비스 연동 및 효율적인 웹 배포 관리",
    },
    {
      id: "workflow",
      category: "Collaboration & Workflow",
      shortLabel: "Workflow",
      skills: ["Git", "GitHub", "Jira", "Notion"],
      desc: "능동적인 일정 관리 및 협업 툴 활용",
    },
  ];

  const supplementarySkills = ["Redux", "Recoil"];

  return (
    <section
      className="relative flex w-full justify-center py-16 md:py-20"
      id="about"
    >
      <div className="grid w-full max-w-[1320px] grid-cols-1 items-center gap-12 px-5 mx-auto md:px-10 xl:grid-cols-[0.88fr_1.12fr] xl:gap-16">
        {/* 1. Core Value (좌측) */}
        <section className="flex flex-col gap-8 lg:gap-y-12">
          {values.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 transition-colors border-l-2 border-gray-200 group hover:border-primary/50"
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
        <TechMarquee groups={skills} additionalSkills={supplementarySkills} />
      </div>
    </section>
  );
}
