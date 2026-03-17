"use client";

import React, { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
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
          return ["frontend", "ui dev", "markup"].some((t) => tags.includes(t));
        }
        return tags.some((t) => t.includes("design"));
      })
      .sort((a, b) => {
        return b.startDate.localeCompare(a.startDate);
      });
  }, [category]);

  return (
    <section className="w-full px-6 mx-auto py-28 max-w-7xl">
      <div className="flex flex-col items-center mb-16 space-y-12">
        {/* 타이틀 영역 */}
        <div className="space-y-4 text-center">
          <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
            Dayoung Jung: UI Designer & Developer
          </p>
          <h2 className="text-4xl font-bold text-gray-900 md:text-6xl">
            Project Archive
          </h2>
        </div>

        {/* 필터링 버튼 */}
        <div className="flex flex-wrap justify-center p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl border border-gray-100">
          {(["all", "development", "design"] as const).map((c) => (
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

        {/* 필터 결과 요약 */}
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
