import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import { HeroProvider } from "@/context/HeroContext";

const Home = () => {
  return (
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
  );
};

export default Home;
