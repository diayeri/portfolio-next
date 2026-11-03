"use client";

import Hero from "@/components/main/Hero";
import Skill from "@/components/main/Skill";
import Timeline from "@/components/main/Timeline";
import ProjectPreviewList from "@/components/main/ProjectPreviewList";
import { HeroProvider } from "@/context/HeroContext";
import { RoleProvider } from "@/context/RoleContext";

type HomeProps = {
  roleKey: "design" | "develop";
};

const projectPreviewIds = [
  "heysandy",
  "miral-fan",
  "muna",
  "miral-campaign",
  "miral-payment",
];

export default function Home({ roleKey }: HomeProps) {
  return (
    <RoleProvider roleKey={roleKey}>
      <div className="relative flex flex-col items-center justify-center">
        <HeroProvider>
          <Hero />
        </HeroProvider>
        <ProjectPreviewList projectIds={projectPreviewIds} />
        <Timeline />
        <Skill />
      </div>
    </RoleProvider>
  );
}
