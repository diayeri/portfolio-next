"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import AnimatedElement from "@/components/AnimatedElement";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { projectsData } from "@/data/projectsData";

type Category = "all" | "frontend" | "markup" | "design";

const Projects: React.FC = () => {
  const [category, setCategory] = useState<Category>("all");

  // const router = useRouter();
  return (
    <section className="w-full px-10 py-20">
      <div className="py-10 text-center">
        <h2 className="mb-10 text-5xl font-bold">Projects</h2>
        <div className="flex justify-center gap-2">
          {(["all", "frontend", "markup", "design"] as Category[]).map((c) => (
            <Button
              key={c}
              onClick={() => setCategory(c)}
              className={category === c ? "active" : ""}
            >
              {c.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-5">
        {projectsData.map((project, index) => (
          <AnimatedElement
            key={project.id}
            animation="fade-up"
            duration={800}
            delay={300 + index * 100}
          >
            <div
              // onClick={() => router.push(`/projects/${project.id}`)}
              className="h-full cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
};

export default Projects;
