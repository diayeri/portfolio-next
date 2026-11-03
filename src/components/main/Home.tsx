"use client";

import Hero from "@/components/main/Hero";
import Intro from "@/components/main/Intro";
import Timeline from "@/components/main/Timeline";
import ProjectPreviewList from "@/components/main/ProjectPreviewList";
import { HeroProvider } from "@/context/HeroContext";
import { RoleProvider } from "@/context/RoleContext";

type HomeProps = {
  roleKey: "design" | "develop";
};

const projectPreviewIds = [
  "heysandy",
  "miral-1000",
  "miral-fan",
  "miral-payment",
  "muna",
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
        <Intro />
      </div>
    </RoleProvider>
  );
}
