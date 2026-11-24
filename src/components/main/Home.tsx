"use client";

import Skill from "@/components/main/Skill";
import Timeline from "@/components/main/Timeline";
import ShelfHero from "@/components/main/shelf/ShelfHero";
import { RoleProvider } from "@/context/RoleContext";

type HomeProps = {
  roleKey: "design" | "develop";
};

// 기존 Hero.tsx, ProjectPreviewList.tsx는 비교용으로 파일만 남겨 둔다 (CLAUDE.md).
// 대표 프로젝트는 projectsData의 featured 기준으로 ShelfHero 안에서 보여준다.
export default function Home({ roleKey }: HomeProps) {
  return (
    <RoleProvider roleKey={roleKey}>
      <div className="relative flex flex-col items-center justify-center">
        <ShelfHero />
        <Timeline />
        <Skill />
      </div>
    </RoleProvider>
  );
}
