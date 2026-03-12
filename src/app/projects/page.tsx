"use client";

import React, { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/Button";
import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";

type Category = "all" | "frontend" | "ui dev" | "design";

const Projects: React.FC = () => {
  const [category, setCategory] = useState<Category>("all");

  const filteredProjects = useMemo(() => {
    if (category === "all") return projectsData;
    return projectsData.filter((project) =>
      project.category.some((c) => c.toLowerCase() === category),
    );
  }, [category, projectsData]);

  // const router = useRouter();
  return (
    <section className="w-full px-6 mx-auto py-28 max-w-7xl">
      <div className="flex flex-col items-center mb-16 space-y-12">
        {/* 타이틀 영역: 올라운더 정체성 부여 */}
        <div className="space-y-4 text-center">
          <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
            Dayoung Jung: UI Designer & Developer
          </p>
          <h2 className="text-4xl font-bold text-gray-900 md:text-6xl">
            Project Archive
          </h2>
        </div>

        {/* 필터 영역: 세련된 탭 버튼 스타일 */}
        <div className="flex flex-wrap justify-center p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl border border-gray-100">
          {(["all", "frontend", "ui dev", "design"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`
            px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl
            ${
              category === c
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
            }
          `}
            >
              {c === "all" ? "All Works" : c}
            </button>
          ))}
        </div>

        {/* 필터 결과 요약 (사용성 향상) */}
        {/* <p className="text-xs text-gray-400">
          Showing{" "}
          <span className="font-bold text-gray-900">
            {filteredProjects.length}
          </span>{" "}
          {category === "all" ? "total" : category} projects
        </p> */}
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-5">
        {filteredProjects.map((project, index) => (
          <motion.div
            {...fadeUp(index < 6 ? index * 0.05 : 0)}
            key={project.id}
            // onClick={() => router.push(`/projects/${project.id}`)}
            className="h-full cursor-pointer"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
