"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SkillGroup = {
  id: string;
  category: string;
  shortLabel: string;
  skills: string[];
  desc: string;
};

const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend",
    shortLabel: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "jQuery",
    ],
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

const TIN_CASE_IMAGE = "/main/bg_intro.png";
const DETAIL_ID = "skill-detail";

const logos = [
  { src: "/logos/html.svg", alt: "HTML" },
  { src: "/logos/css.svg", alt: "CSS" },
  { src: "/logos/js.svg", alt: "JavaScript" },
  { src: "/logos/ts.svg", alt: "TypeScript" },
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/jquery.svg", alt: "jQuery" },
  { src: "/logos/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/logos/mui.svg", alt: "MUI" },
  { src: "/logos/bootstrap.svg", alt: "Bootstrap" },
  { src: "/logos/figma.svg", alt: "Figma" },
  { src: "/logos/photoshop.svg", alt: "Photoshop" },
  { src: "/logos/illustrator.svg", alt: "Illustrator" },
];

const hotspotPositionClasses = [
  "top-[27%] left-[38%] max-md:top-[29%] max-md:left-[31%]",
  "top-[73%] left-[55%] max-md:top-[68%] max-md:left-[42%]",
  "top-[47%] left-[73%] max-md:top-[40%] max-md:left-[63%]",
  "top-[39%] left-[86%] max-md:top-[64%] max-md:left-[81%]",
];

export default function Skill() {
  const groups = skillGroups;
  const additionalSkills = supplementarySkills;
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);
  const [mobileGroupId, setMobileGroupId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const activeGroup = groups.find(
    (group) => group.id === (hoveredGroupId ?? focusedGroupId),
  );
  const activeGroupIndex = activeGroup
    ? groups.findIndex((group) => group.id === activeGroup.id) + 1
    : 0;
  const mobileGroup = groups.find((group) => group.id === mobileGroupId);
  const mobileGroupIndex = mobileGroup
    ? groups.findIndex((group) => group.id === mobileGroup.id) + 1
    : 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mobileGroupId && !dialog.open) {
      dialog.showModal();
    } else if (!mobileGroupId && dialog.open) {
      dialog.close();
    }
  }, [mobileGroupId]);

  const openMobileDetails = (groupId: string) => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setHoveredGroupId(null);
      setFocusedGroupId(null);
      setMobileGroupId(groupId);
    }
  };

  return (
    <section className="relative w-full">
      <section
        aria-label="Skills and tools"
        className="mx-auto flex w-full max-w-[1400px] lg:rounded-2xl -mb-20 lg:mb-0 lg:border flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,rgba(255,255,255,0.88),#fbf8f2)] shadow-[0_22px_60px_rgba(67,49,78,0.09)]"
      >
        <div
          className="relative isolate aspect-[1536/741] max-h-[560px] w-full overflow-hidden"
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setHoveredGroupId(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setHoveredGroupId(null);
              setFocusedGroupId(null);
            }
          }}
        >
          <p className="absolute right-3 top-3 z-[5] m-0 max-w-40 text-right text-[0.58rem] font-extrabold uppercase tracking-[0.08em] text-[#51415f] max-md:max-w-[7.5rem] max-md:text-[0.52rem]">
            Hover, focus or tap to explore
          </p>
          <div className="absolute left-0 top-1/2 aspect-[1536/741] w-full -translate-y-1/2">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#e9e0ef] bg-cover bg-center shadow-[0_14px_28px_rgba(58,43,67,0.15)]"
              style={{ backgroundImage: `url("${TIN_CASE_IMAGE}")` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(52,38,62,0.1))]" />
            </div>

            {groups.map((group, index) => {
              const isActive = activeGroup?.id === group.id;
              const isMobileSelected = mobileGroup?.id === group.id;

              return (
                <div
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 ${hotspotPositionClasses[index] ?? ""}`}
                  key={group.id}
                >
                  <button
                    aria-label={`${group.category}: ${group.skills.join(", ")}`}
                    aria-expanded={isActive || isMobileSelected}
                    aria-describedby={isActive ? DETAIL_ID : undefined}
                    aria-controls={
                      isMobileSelected
                        ? `skill-dialog-${group.id}-dialog`
                        : isActive
                          ? DETAIL_ID
                          : undefined
                    }
                    className=" flex min-h-[2.6rem] items-center gap-[0.45rem] rounded-full border border-[rgba(85,67,100,0.19)] bg-[rgba(255,253,248,0.96)] px-[0.62rem] py-[0.38rem] text-[clamp(0.6rem,0.75vw,0.72rem)] font-bold leading-none text-[#51415f] shadow-[0_5px_16px_rgba(44,31,52,0.19)] transition-[transform,background-color,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_9px_22px_rgba(44,31,52,0.23)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#9b86b8] focus-visible:outline-offset-[3px] aria-expanded:-translate-y-0.5 aria-expanded:bg-white aria-expanded:shadow-[0_9px_22px_rgba(44,31,52,0.23)] motion-reduce:transition-none max-md:min-h-[2.45rem] max-md:gap-[0.3rem] max-md:px-[0.45rem] max-md:py-[0.3rem] max-md:text-[0.55rem]"
                    onBlur={() => setFocusedGroupId(null)}
                    onClick={() => openMobileDetails(group.id)}
                    onFocus={() => {
                      if (!window.matchMedia("(pointer: coarse)").matches) {
                        setFocusedGroupId(group.id);
                      }
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        setHoveredGroupId(group.id);
                      }
                    }}
                    type="button"
                  >
                    <span className="grid h-[1.45rem] w-[1.45rem] flex-[0_0_auto] place-items-center rounded-full bg-[#9b86b8] text-[0.58rem] font-extrabold text-white max-md:h-[1.3rem] max-md:w-[1.3rem] max-md:text-[0.53rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap max-md:max-w-[4.4rem]">
                      {group.shortLabel}
                    </span>
                  </button>
                </div>
              );
            })}

            <div
              aria-hidden={!activeGroup}
              className={`absolute left-1/2 top-1/2 z-[4] w-[min(16.5rem,calc(100%-1.8rem))] -translate-x-1/2 -translate-y-1/2 rounded-[1.1rem] border border-[rgba(102,82,118,0.14)] bg-[rgba(255,253,248,0.97)] p-4 text-[#51415f] shadow-[0_16px_36px_rgba(44,31,52,0.18)] transition-[opacity,visibility] duration-150 motion-reduce:transition-none max-md:hidden ${
                activeGroup
                  ? "visible opacity-100"
                  : "invisible pointer-events-none opacity-0"
              }`}
              id={DETAIL_ID}
              role="tooltip"
            >
              {activeGroup && (
                <>
                  <p className="m-0 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-[#9b86b8]">
                    TECH {String(activeGroupIndex).padStart(2, "0")}
                  </p>
                  <h4 className="mb-[0.35rem] mt-[0.45rem] text-base font-bold tracking-[-0.02em]">
                    {activeGroup.category}
                  </h4>
                  <p className="m-0 text-xs leading-[1.55] text-[#746c78]">
                    {activeGroup.desc}
                  </p>
                  <ul className="mb-0 mt-3 flex list-none flex-wrap gap-[0.35rem] p-0">
                    {activeGroup.skills.map((skill) => (
                      <li
                        className="rounded-full border border-[rgba(106,87,121,0.15)] bg-[#f3eef5] px-[0.55rem] py-[0.32rem] text-[0.63rem] font-semibold leading-[1.1] text-[#51415f]"
                        key={skill}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 bg-[rgba(255,255,255,0.66)] px-[0.7rem] py-[0.55rem] max-md:grid-cols-1 max-md:gap-[0.45rem] max-md:p-[0.6rem]">
          <span className="whitespace-nowrap text-[0.54rem] font-extrabold uppercase tracking-[0.1em] text-[#746c78] max-md:text-center">
            Tools in the box
          </span>
          <ul
            aria-label="Technology logos and supplementary tools"
            className="m-0 flex list-none flex-wrap items-center justify-end gap-[0.32rem] p-0 max-md:justify-center max-md:gap-[0.28rem]"
          >
            {logos.map((logo) => (
              <li
                className="grid h-[1.7rem] w-[1.7rem] flex-[0_0_auto] place-items-center rounded-[0.55rem] border border-[rgba(112,96,126,0.1)] bg-[rgba(255,255,255,0.9)] max-md:h-[1.55rem] max-md:w-[1.55rem]"
                key={logo.alt}
                title={logo.alt}
              >
                <Image
                  alt={logo.alt}
                  className="h-[1.1rem] w-[1.1rem] object-contain max-md:h-4 max-md:w-4"
                  decoding="async"
                  height={16}
                  loading="lazy"
                  src={logo.src}
                  width={16}
                />
              </li>
            ))}
            {additionalSkills.map((skill) => (
              <li
                className="whitespace-nowrap rounded-full border border-[rgba(106,87,121,0.15)] bg-[#f3eef5] px-[0.55rem] py-[0.32rem] text-[0.58rem] font-semibold leading-[1.1] text-[#51415f]"
                key={skill}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <dialog
          aria-labelledby={
            mobileGroup ? `skill-dialog-${mobileGroup.id}` : undefined
          }
          className="fixed left-1/2 top-1/2 m-0 max-h-[calc(100dvh-2rem)] w-[min(25rem,calc(100vw-2rem))] max-w-none -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-[rgba(112,96,126,0.2)] bg-[#fbf8f2] p-[1.35rem] text-[#51415f] shadow-[0_24px_70px_rgba(37,27,46,0.26)] backdrop:bg-[rgba(40,31,47,0.42)] backdrop:backdrop-blur-[5px]"
          id={mobileGroup ? `skill-dialog-${mobileGroup.id}-dialog` : undefined}
          onCancel={(event) => {
            event.preventDefault();
            setHoveredGroupId(null);
            setFocusedGroupId(null);
            setMobileGroupId(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setHoveredGroupId(null);
              setFocusedGroupId(null);
              setMobileGroupId(null);
            }
          }}
          onClose={() => {
            setHoveredGroupId(null);
            setFocusedGroupId(null);
            setMobileGroupId(null);
          }}
          ref={dialogRef}
        >
          {mobileGroup && (
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="m-0 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-[#9b86b8]">
                  TECH {String(mobileGroupIndex).padStart(2, "0")}
                </p>
                <button
                  aria-label={`Close ${mobileGroup.category} details`}
                  className="rounded-full border border-[rgba(81,65,95,0.18)] bg-white px-[0.7rem] py-[0.4rem] text-[0.7rem] font-bold text-[#51415f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#9b86b8] focus-visible:outline-offset-[3px]"
                  onClick={() => {
                    setHoveredGroupId(null);
                    setFocusedGroupId(null);
                    setMobileGroupId(null);
                  }}
                  type="button"
                >
                  Close
                </button>
              </div>
              <h3
                className="mb-2 mt-4 text-[1.3rem] font-bold tracking-[-0.03em] text-[#51415f]"
                id={`skill-dialog-${mobileGroup.id}`}
              >
                {mobileGroup.category}
              </h3>
              <p className="m-0 text-[0.9rem] leading-[1.6] text-[#746c78]">
                {mobileGroup.desc}
              </p>
              <ul className="mb-0 mt-3 flex list-none flex-wrap gap-[0.35rem] p-0">
                {mobileGroup.skills.map((skill) => (
                  <li
                    className="rounded-full border border-[rgba(106,87,121,0.15)] bg-[#f3eef5] px-[0.55rem] py-[0.32rem] text-[0.63rem] font-semibold leading-[1.1] text-[#51415f]"
                    key={skill}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </dialog>
      </section>
    </section>
  );
}
