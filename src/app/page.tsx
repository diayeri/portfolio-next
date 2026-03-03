import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import { HeroProvider } from "@/context/HeroContext";
import { RoleProvider } from "@/context/RoleContext";

const Home = ({ searchParams }: { searchParams: { role?: string } }) => {
  const roleKey = searchParams.role === "design" ? "design" : "develop";

  return (
    <RoleProvider roleKey={roleKey}>
      <div className="relative flex flex-col items-center justify-center">
        {/* Hero */}
        <HeroProvider>
          <Hero />
        </HeroProvider>
        {/* Core Competencies */}
        <Intro />
        {/* Projects */}
        <Portfolio />
        {/* Career History */}
        <Timeline />
      </div>
    </RoleProvider>
  );
};

export default Home;
