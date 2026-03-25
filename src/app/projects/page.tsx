"use client";

import React, { useState, useMemo } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";

type TabCategory = "all" | "development" | "design";

const Projects: React.FC = () => {
  const [category, setCategory] = useState<TabCategory>("all");

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        if (category === "all") return true;
        const tags = project.category.map((t) => t.toLowerCase());

        if (category === "development") {
          return ["frontend", "markup"].some((t) => tags.includes(t));
        }
        return tags.some((t) => t.includes("design"));
      })
      .sort((a, b) => {
        return b.startDate.localeCompare(a.startDate);
      });
  }, [category]);

  return (
    <section className="w-full px-5 mx-auto py-28 max-w-7xl">
      <div className="flex flex-col items-center mb-12 space-y-8 md:mb-16 md:space-y-12">
        {/* 타이틀 영역 */}
        <div className="space-y-4 text-center">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-gray-400 uppercase">
            Dayoung Jung: UX/UI Designer & Developer
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Project Archive
          </h2>
        </div>

        <div className="flex w-full sm:w-auto overflow-x-auto no-scrollbar p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl border border-gray-100">
          <div className="flex justify-center w-full mx-auto flex-nowrap sm:w-auto">
            {(["all", "development", "design"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`
              whitespace-nowrap w-1/3 sm:w-auto px-5 md:px-6 py-2.5 md:py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl
              ${
                category === c
                  ? "bg-white text-primary shadow-sm scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
              >
                {c === "all" ? "All Works" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
        {filteredProjects.map((project, index) => (
          <motion.div
            {...fadeUp(index < 6 ? index * 0.05 : 0)}
            key={project.id}
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
