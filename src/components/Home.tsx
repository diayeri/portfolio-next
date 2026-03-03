"use client";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import { HeroProvider } from "@/context/HeroContext";
import { RoleProvider } from "@/context/RoleContext";

type HomeProps = {
  roleKey: "design" | "develop";
};

export default function Home({ roleKey }: HomeProps) {
  return (
    <RoleProvider roleKey={roleKey}>
      <div className="relative flex flex-col items-center justify-center">
        <HeroProvider>
          <Hero />
        </HeroProvider>
        <Intro />
        <Portfolio />
        <Timeline />
      </div>
    </RoleProvider>
  );
}
