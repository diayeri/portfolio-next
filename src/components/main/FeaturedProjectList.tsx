"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useRole } from "@/context/RoleContext";
import { Button } from "../Button";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";

const FeaturedProjectList = () => {
  const { roleData } = useRole();
  const featuredProjects = useMemo(() => {
    return projectsData
      .filter((p) => p.featured !== undefined)
      .sort((a, b) => a.featured!.order! - b.featured!.order!);
  }, []);

  const [activeProject, setActiveProject] = useState(featuredProjects[0]);
  const router = useRouter();

  useEffect(() => {
    featuredProjects.forEach((project) => {
      const img = new Image();
      img.src = project.featured!.cover;
    });
  }, [featuredProjects]);

  return (
    <section className="w-full bg-black">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-24 md:px-10">
        <div className="flex flex-wrap justify-between w-full gap-6 mb-5 md:mb-12">
          <motion.h2
            {...fadeUp(0, false)}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            Featured Projects
          </motion.h2>

          <Button
            size="sm"
            variant="outline"
            className="hover:text-white hover:border-white"
            iconRight={<ArrowRight />}
            onClick={() => router.push("/projects")}
          >
            View All
          </Button>
        </div>
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* 미리보기 영역 */}
          <div className="lg:w-1/2 xl:h-[600px] rounded overflow-hidden items-center justify-center lg:flex hidden">
            <NextImage
              src={activeProject.featured!.cover}
              alt={activeProject.title}
              className="object-contain object-left w-full h-full transition-all duration-300"
              width={800}
              height={800}
            />
          </div>
          {/* 대표 프로젝트 리스트 */}
          <ul className="z-10 flex flex-col w-full gap-0 lg:w-1/2">
            {featuredProjects.map((project) => {
              const isActive = activeProject.id === project.id;
              return (
                <li
                  className="group"
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project)}
                >
                  <a href={`/projects/${project.id}`}>
                    <div
                      className={`flex items-center justify-between py-7 xl:py-8 duration-200 border-b ${isActive ? "border-white/60" : "border-white/20"}`}
                    >
                      <h3
                        className={`text-xl md:text-2xl xl:text-3xl font-semibold transition-colors duration-200 ${
                          isActive ? "text-white" : "text-gray-400/40"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <div className="inline-flex gap-2 ml-5">
                        {project.category.map((tag) => (
                          <span
                            key={tag}
                            className={`
                            px-2 py-0.5 text-xs font-bold uppercase duration-200 tracking-wider rounded border transition-colors
                            ${
                              isActive
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-transparent border-white/20 text-white/30"
                            }
                          `}
                          >
                            {roleData.replaceRole(tag)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectList;
